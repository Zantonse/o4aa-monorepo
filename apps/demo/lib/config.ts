/**
 * Centralised environment variable config.
 * Accessed at runtime — not validated at import time so the app
 * can start without a full .env.local (helpful during development).
 */

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required environment variable: ${name}`);
  return val;
}

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export function getConfig() {
  return {
    // Okta OIDC app (human-facing, PKCE)
    clientId:     required('CLIENT_ID'),
    clientSecret: required('CLIENT_SECRET'),
    oktaIssuer:   required('OKTA_ISSUER'),
    redirectUri:  required('REDIRECT_URI'),

    // Agent OAuth client (private_key_jwt)
    agentClientId:    required('AGENT_CLIENT_ID'),
    agentPrivateKeyJwk: required('AGENT_PRIVATE_KEY_JWK'),
    agentKeyId:       required('AGENT_KEY_ID'),

    // JAG (JWT Authorization Grant) parameters
    jagIssuer:         required('JAG_ISSUER'),
    jagAudience:       required('JAG_AUDIENCE'),
    jagTargetAudience: required('JAG_TARGET_AUDIENCE'),
    jagScope:          optional('JAG_SCOPE', 'openid'),

    // Resource server
    resourceAudience:       required('RESOURCE_AUDIENCE'),
    resourceTokenEndpoint:  required('RESOURCE_TOKEN_ENDPOINT'),

    // Session encryption
    sessionSecret: required('SESSION_SECRET'),
  };
}

export type Config = ReturnType<typeof getConfig>;
