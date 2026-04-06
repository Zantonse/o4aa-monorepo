interface OAuthErrorBody {
  error?:             string;
  error_description?: string;
}

/**
 * Converts raw OAuth / HTTP error payloads into messages a developer
 * (or demo audience) can understand immediately.
 */
export function getHumanFriendlyError(error: unknown): string {
  if (typeof error === 'string') return mapKnownError(error, undefined);

  if (error instanceof Error) {
    // Decorated error — may carry an OAuth error field
    const e = error as Error & { oauthError?: string; oauthDescription?: string };
    if (e.oauthError) {
      return mapKnownError(e.oauthError, e.oauthDescription ?? e.message);
    }
    return mapKnownError(error.message, undefined);
  }

  if (isOAuthErrorBody(error)) {
    return mapKnownError(error.error ?? 'unknown_error', error.error_description);
  }

  return 'An unexpected error occurred. Check the server logs for details.';
}

function isOAuthErrorBody(value: unknown): value is OAuthErrorBody {
  return typeof value === 'object' && value !== null && 'error' in value;
}

function mapKnownError(code: string, description?: string): string {
  const hint = description ? ` — ${description}` : '';

  const known: Record<string, string> = {
    // PKCE / auth code errors
    'invalid_grant':
      'The authorisation code or PKCE verifier was rejected. ' +
      'This usually means the code has expired or was already used.',

    'invalid_client':
      'Client authentication failed. Verify CLIENT_ID, CLIENT_SECRET, ' +
      'and that the redirect URI matches exactly.',

    'access_denied':
      'The user denied access or the requested scope is not allowed ' +
      'for this client.',

    'invalid_request':
      'A required parameter was missing or malformed. ' +
      'Check the PKCE challenge and redirect URI configuration.',

    // Token exchange errors
    'invalid_target':
      'The requested audience or resource is not permitted for this token. ' +
      'Check JAG_TARGET_AUDIENCE and RESOURCE_AUDIENCE.',

    'unauthorized_client':
      'This client is not authorised to use the token exchange grant type. ' +
      'Ensure the agent client has the correct grant types enabled in Okta.',

    'unsupported_grant_type':
      'The token exchange grant type is not enabled. ' +
      'Verify the authorization server policy in Okta.',

    // JWT / assertion errors
    'invalid_token':
      'A token in the exchange was invalid, expired, or failed signature validation. ' +
      'Check AGENT_PRIVATE_KEY_JWK and AGENT_KEY_ID.',

    'token_expired':
      'One of the tokens in the exchange has expired. Restart the flow.',

    // Config / environment
    'SESSION_SECRET is not configured':
      'SESSION_SECRET environment variable is missing. Add it to .env.local.',

    'Missing required environment variable':
      `A required environment variable is not set.${hint} ` +
      'Check .env.local against the README.',
  };

  // Exact match
  if (known[code]) return known[code] + hint;

  // Partial match for environment variable errors
  for (const [key, msg] of Object.entries(known)) {
    if (code.startsWith(key)) return msg;
  }

  // Generic fallback
  const display = description ?? code;
  return `OAuth error: ${display}`;
}
