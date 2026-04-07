import type { ConfigKey } from './config-types';

export function deriveFields(hostname: string, authServerId: string): Partial<Record<ConfigKey, string>> {
  const base = `https://${hostname}`;
  return {
    oktaIssuer:            base,
    redirectUri:           'https://o4aa-demo.vercel.app/api/auth/callback',
    jagIssuer:             `${base}/oauth2`,
    jagAudience:           `${base}/oauth2/v1/token`,
    jagTargetAudience:     `${base}/oauth2/${authServerId}`,
    jagScope:              'ai_agent',
    resourceAudience:      `${base}/oauth2/${authServerId}/v1/token`,
    resourceTokenEndpoint: `${base}/oauth2/${authServerId}/v1/token`,
  };
}

export function extractHostname(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('.okta.com') || u.hostname.endsWith('.oktapreview.com')) {
      return u.hostname;
    }
  } catch { /* invalid URL */ }
  return null;
}

export function extractAuthServerId(url: string): string | null {
  const match = url.match(/\/admin\/oauth2\/as\/(aus[a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}
