import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getConfig } from '@/lib/config';
import { signJwtBearerAssertion } from '@/lib/jag-assertions';
import {
  encrypt,
  decrypt,
  serializeCookie,
  clearCookie,
  COOKIE_NAME,
  type PKCESession,
  type FlowSession,
  type FlowStep,
} from '@/lib/session';
import { getHumanFriendlyError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

// ─── helpers ─────────────────────────────────────────────────────────────────

function baseUrl(redirectUri: string, fallbackOrigin: string): string {
  try {
    const u = new URL(redirectUri);
    return `${u.protocol}//${u.host}`;
  } catch {
    return fallbackOrigin;
  }
}

interface PostFormResult {
  data: Record<string, unknown>;
  durationMs: number;
  rawRequest: string;
  rawResponse: string;
  statusCode: number;
}

async function postForm(
  endpoint: string,
  params: Record<string, string>,
): Promise<PostFormResult> {
  const start = Date.now();
  const body  = new URLSearchParams(params);
  const url   = new URL(endpoint);

  const res = await fetch(endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    body.toString(),
  });

  const durationMs  = Date.now() - start;
  const statusCode  = res.status;
  const text        = await res.text();

  // Build raw HTTP request representation (secrets redacted)
  const redactKeys = ['client_secret', 'client_assertion', 'subject_token', 'code_verifier', 'assertion'];
  const safeBody = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([k, v]) =>
        redactKeys.includes(k) ? [k, '[REDACTED]'] : [k, v],
      ),
    ),
  ).toString();
  const rawRequest = [
    `POST ${url.pathname} HTTP/1.1`,
    `Host: ${url.host}`,
    `Content-Type: application/x-www-form-urlencoded`,
    ``,
    safeBody,
  ].join('\n');

  // Build raw HTTP response representation (tokens redacted)
  let responseBody = text;
  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    const safeObj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string' && v.split('.').length === 3) {
        safeObj[k] = '[TOKEN]';
      } else {
        safeObj[k] = v;
      }
    }
    responseBody = JSON.stringify(safeObj, null, 2);
  } catch {
    // not JSON — use raw text
  }
  const statusText = res.statusText || (res.ok ? 'OK' : 'Error');
  const rawResponse = [
    `HTTP/1.1 ${statusCode} ${statusText}`,
    `Content-Type: application/json`,
    ``,
    responseBody,
  ].join('\n');

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text) as Record<string, unknown>;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(
      (data as { error_description?: string }).error_description ??
      (data as { error?: string }).error ??
      `HTTP ${res.status}`,
    ) as Error & { oauthError?: string; oauthDescription?: string; rawRequest?: string; rawResponse?: string; statusCode?: number };
    err.oauthError       = (data as { error?: string }).error;
    err.oauthDescription = (data as { error_description?: string }).error_description;
    err.rawRequest       = rawRequest;
    err.rawResponse      = rawResponse;
    err.statusCode       = statusCode;
    throw err;
  }

  return { data, durationMs, rawRequest, rawResponse, statusCode };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  const config  = await getConfig();
  const requestOrigin = new URL(req.url).origin;
  const origin  = baseUrl(config.redirectUri, requestOrigin);
  const flowUrl = `${origin}/flow`;

  const steps: FlowStep[] = [];

  // ── Validate callback params ────────────────────────────────────────────────
  const { searchParams } = req.nextUrl;
  const code  = searchParams.get('code');
  const state = searchParams.get('state');
  const oauthError = searchParams.get('error');

  if (oauthError) {
    const desc = searchParams.get('error_description') ?? oauthError;
    return redirectWithError(flowUrl, getHumanFriendlyError({ error: oauthError, error_description: desc }));
  }

  if (!code || !state) {
    return redirectWithError(flowUrl, 'Missing code or state in callback.');
  }

  // ── Retrieve + validate PKCE session cookie ──────────────────────────────────
  const rawCookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!rawCookie) {
    return redirectWithError(flowUrl, 'Session cookie missing. Please restart the flow.');
  }

  const pkceSession = decrypt(rawCookie) as PKCESession | null;
  if (!pkceSession) {
    return redirectWithError(flowUrl, 'Session cookie is invalid or tampered.');
  }

  if (pkceSession.state !== state) {
    return redirectWithError(flowUrl, 'State mismatch — possible CSRF. Please restart the flow.');
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 1 — Exchange authorisation code for ID token
  // ════════════════════════════════════════════════════════════════
  const step1Params: Record<string, string> = {
    grant_type:    'authorization_code',
    code,
    redirect_uri:  config.redirectUri,
    client_id:     config.clientId,
    client_secret: config.clientSecret,
    code_verifier: pkceSession.verifier,
  };

  let idToken: string;

  try {
    const step1Endpoint = `${config.oktaIssuer}/v1/token`;
    const { data, durationMs, rawRequest, rawResponse, statusCode } = await postForm(step1Endpoint, step1Params);

    idToken = data.id_token as string;
    if (!idToken) throw new Error('No id_token in response');

    steps.push({
      label:      'Step 1 — Auth code → ID token',
      endpoint:   step1Endpoint,
      params:     sanitiseParams(step1Params),
      response:   sanitiseResponse(data),
      durationMs,
      rawRequest,
      rawResponse,
      statusCode,
    });
  } catch (err) {
    const e = err as Error & { rawRequest?: string; rawResponse?: string; statusCode?: number };
    steps.push({
      label:       'Step 1 — Auth code → ID token',
      endpoint:    `${config.oktaIssuer}/v1/token`,
      params:      sanitiseParams(step1Params),
      error:       getHumanFriendlyError(err),
      rawRequest:  e.rawRequest,
      rawResponse: e.rawResponse,
      statusCode:  e.statusCode,
    });
    return redirectWithSession(flowUrl, { steps, error: getHumanFriendlyError(err) }, config.sessionSecret);
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 2 — Token exchange: ID token → JAG token
  // ════════════════════════════════════════════════════════════════
  let jagToken: string;
  let jagClientAssertionJwt: string | undefined;

  try {
    const agentPrivateKeyJwk = JSON.parse(config.agentPrivateKeyJwk) as crypto.JsonWebKey;
    const jagClientAssertion  = await signJwtBearerAssertion({
      clientId:      config.agentClientId,
      audience:      `${config.jagIssuer}/v1/token`,
      privateKeyJwk: agentPrivateKeyJwk,
      keyId:         config.agentKeyId,
    });
    jagClientAssertionJwt = jagClientAssertion;

    const step2Endpoint = `${config.jagIssuer}/v1/token`;
    const step2Params: Record<string, string> = {
      grant_type:            'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token:         idToken,
      subject_token_type:    'urn:ietf:params:oauth:token-type:id_token',
      requested_token_type:  'urn:ietf:params:oauth:token-type:id-jag',
      audience:              config.jagTargetAudience,
      scope:                 config.jagScope,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      jagClientAssertion,
    };

    const { data, durationMs, rawRequest, rawResponse, statusCode } = await postForm(step2Endpoint, step2Params);

    jagToken = (data.access_token ?? data.issued_token) as string;
    if (!jagToken) throw new Error('No token in JAG exchange response');

    steps.push({
      label:      'Step 2 — ID token → JAG token',
      endpoint:   step2Endpoint,
      params:     sanitiseParams(step2Params),
      response:   sanitiseResponse(data),
      durationMs,
      rawRequest,
      rawResponse,
      statusCode,
    });
  } catch (err) {
    const e = err as Error & { rawRequest?: string; rawResponse?: string; statusCode?: number };
    steps.push({
      label:       'Step 2 — ID token → JAG token',
      endpoint:    `${config.jagIssuer}/v1/token`,
      params:      {},
      error:       getHumanFriendlyError(err),
      rawRequest:  e.rawRequest,
      rawResponse: e.rawResponse,
      statusCode:  e.statusCode,
    });
    return redirectWithSession(
      flowUrl,
      { idToken, steps, error: getHumanFriendlyError(err) },
      config.sessionSecret,
    );
  }

  // ════════════════════════════════════════════════════════════════
  // STEP 3 — Token exchange: JAG token → access token
  // ════════════════════════════════════════════════════════════════
  let accessToken: string;
  let resourceClientAssertionJwt: string | undefined;

  try {
    const agentPrivateKeyJwk = JSON.parse(config.agentPrivateKeyJwk) as crypto.JsonWebKey;
    const resourceClientAssertion = await signJwtBearerAssertion({
      clientId:      config.agentClientId,
      audience:      config.resourceTokenEndpoint,
      privateKeyJwk: agentPrivateKeyJwk,
      keyId:         config.agentKeyId,
    });
    resourceClientAssertionJwt = resourceClientAssertion;

    const step3Params: Record<string, string> = {
      grant_type:            'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:             jagToken,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      resourceClientAssertion,
    };

    const { data, durationMs, rawRequest, rawResponse, statusCode } = await postForm(config.resourceTokenEndpoint, step3Params);

    accessToken = data.access_token as string;
    if (!accessToken) throw new Error('No access_token in resource server response');

    steps.push({
      label:      'Step 3 — JAG token → access token',
      endpoint:   config.resourceTokenEndpoint,
      params:     sanitiseParams(step3Params),
      response:   sanitiseResponse(data),
      durationMs,
      rawRequest,
      rawResponse,
      statusCode,
    });
  } catch (err) {
    const e = err as Error & { rawRequest?: string; rawResponse?: string; statusCode?: number };
    steps.push({
      label:       'Step 3 — JAG token → access token',
      endpoint:    config.resourceTokenEndpoint,
      params:      {},
      error:       getHumanFriendlyError(err),
      rawRequest:  e.rawRequest,
      rawResponse: e.rawResponse,
      statusCode:  e.statusCode,
    });
    return redirectWithSession(
      flowUrl,
      { idToken, jagToken, steps, error: getHumanFriendlyError(err) },
      config.sessionSecret,
    );
  }

  // ── All steps succeeded — store results ─────────────────────────────────────
  const flowSession: FlowSession = {
    idToken,
    jagToken,
    accessToken,
    jagClientAssertion:      jagClientAssertionJwt,
    resourceClientAssertion: resourceClientAssertionJwt,
    steps,
    completedAt: new Date().toISOString(),
  };

  return redirectWithSession(flowUrl, flowSession, config.sessionSecret);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function redirectWithError(url: string, message: string): NextResponse {
  const dest = new URL(url);
  dest.searchParams.set('error', message);
  const res = NextResponse.redirect(dest.toString(), { status: 302 });
  res.headers.set('Set-Cookie', clearCookie());
  return res;
}

function redirectWithSession(url: string, session: Partial<FlowSession>, _secret: string): NextResponse {
  const cookieValue = encrypt(session as object);
  const res = NextResponse.redirect(url, { status: 302 });
  res.headers.set('Set-Cookie', serializeCookie(cookieValue));
  return res;
}

/** Remove sensitive values before storing them in the session. */
function sanitiseParams(params: Record<string, string>): Record<string, string> {
  const redacted = ['client_secret', 'client_assertion', 'subject_token', 'code_verifier', 'assertion'];
  return Object.fromEntries(
    Object.entries(params).map(([k, v]) =>
      redacted.includes(k) ? [k, '[REDACTED]'] : [k, v],
    ),
  );
}

/** Redact raw tokens from stored responses — keep metadata fields only. */
function sanitiseResponse(data: Record<string, unknown>): Record<string, unknown> {
  const keep = ['token_type', 'expires_in', 'scope', 'issued_token_type'];
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (keep.includes(k)) {
      result[k] = v;
    } else if (typeof v === 'string' && v.split('.').length === 3) {
      // JWT — show only the header (algorithm, typ, kid)
      try {
        const header = JSON.parse(Buffer.from(v.split('.')[0], 'base64url').toString()) as Record<string, unknown>;
        result[k] = `[JWT alg=${header.alg ?? '?'} kid=${header.kid ?? '?'}]`;
      } catch {
        result[k] = '[JWT]';
      }
    } else {
      result[k] = v;
    }
  }
  return result;
}
