import { NextRequest, NextResponse } from 'next/server';
import { getConfig } from '@/lib/config';
import { generatePKCE, generateState } from '@/lib/pkce';
import { encrypt, serializeCookie, type PKCESession } from '@/lib/session';
import { getHumanFriendlyError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const config = getConfig();

    // 1. Generate PKCE pair and CSRF state
    const pkce  = await generatePKCE();
    const state = generateState();

    // 2. Persist verifier + state in an encrypted cookie so the callback
    //    can verify the round-trip (CSRF protection + PKCE).
    const session: PKCESession = {
      verifier:  pkce.verifier,
      challenge: pkce.challenge,
      state,
    };
    const cookieValue = encrypt(session);

    // 3. Build the Okta /authorize URL
    const params = new URLSearchParams({
      response_type:         'code',
      client_id:             config.clientId,
      redirect_uri:          config.redirectUri,
      scope:                 'openid profile email',
      state,
      code_challenge:        pkce.challenge,
      code_challenge_method: pkce.method,
    });

    const authorizeUrl = `${config.oktaIssuer}/v1/authorize?${params.toString()}`;

    // 4. Redirect to Okta with the session cookie set
    const response = NextResponse.redirect(authorizeUrl, { status: 302 });
    response.headers.set('Set-Cookie', serializeCookie(cookieValue));
    return response;
  } catch (err) {
    const message = getHumanFriendlyError(err);
    const origin = new URL(_req.url).origin;
    const url = new URL('/flow', origin);
    url.searchParams.set('error', message);
    return NextResponse.redirect(url.toString(), { status: 302 });
  }
}
