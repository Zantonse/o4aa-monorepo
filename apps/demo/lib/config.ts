import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from './session';
import { CONFIG_COOKIE_NAME, type DemoConfig } from './config-shared';

// Re-export shared types for convenience
export type { DemoConfig } from './config-shared';
export { CONFIG_COOKIE_NAME, CONFIG_FIELDS } from './config-shared';

/**
 * Read config from the encrypted cookie first, then fall back to env vars.
 * This lets the demo app work without any env vars — users paste config
 * into the UI form, which stores it in a cookie.
 */
export async function getConfig(): Promise<DemoConfig & { sessionSecret: string }> {
  // Try cookie first
  const cookieStore = await cookies();
  const raw = cookieStore.get(CONFIG_COOKIE_NAME)?.value;
  if (raw) {
    const saved = decrypt(raw) as DemoConfig | null;
    if (saved && saved.clientId) {
      return { ...saved, sessionSecret: process.env.SESSION_SECRET || 'o4aa-demo-session-key-not-for-production' };
    }
  }

  // Fall back to env vars
  function required(name: string): string {
    const val = process.env[name];
    if (!val) throw new Error(`Missing required environment variable: ${name}`);
    return val;
  }

  return {
    clientId: required('CLIENT_ID'),
    clientSecret: required('CLIENT_SECRET'),
    oktaIssuer: required('OKTA_ISSUER'),
    redirectUri: required('REDIRECT_URI'),
    agentClientId: required('AGENT_CLIENT_ID'),
    agentPrivateKeyJwk: required('AGENT_PRIVATE_KEY_JWK'),
    agentKeyId: required('AGENT_KEY_ID'),
    jagIssuer: required('JAG_ISSUER'),
    jagAudience: required('JAG_AUDIENCE'),
    jagTargetAudience: required('JAG_TARGET_AUDIENCE'),
    jagScope: process.env.JAG_SCOPE ?? 'openid',
    resourceAudience: required('RESOURCE_AUDIENCE'),
    resourceTokenEndpoint: required('RESOURCE_TOKEN_ENDPOINT'),
    sessionSecret: required('SESSION_SECRET'),
  };
}

/** Check if config cookie exists (for the landing page to decide what to show). */
export async function hasConfig(): Promise<boolean> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CONFIG_COOKIE_NAME)?.value;
  if (!raw) return !!process.env.CLIENT_ID;
  const saved = decrypt(raw) as DemoConfig | null;
  return !!(saved && saved.clientId);
}

export type Config = DemoConfig & { sessionSecret: string };
