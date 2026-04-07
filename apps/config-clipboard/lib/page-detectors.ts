import type { ConfigKey } from './config-types';

export type PageType = 'oidc-app' | 'workload-principal' | 'auth-server' | 'unknown';

export function detectPageType(url: string): PageType {
  if (/\/admin\/app\/oidc_client\/instance\//.test(url)) return 'oidc-app';
  if (/\/admin\/people\/workload\//.test(url)) return 'workload-principal';
  if (/\/admin\/oauth2\/as\//.test(url)) return 'auth-server';
  return 'unknown';
}

/**
 * Extract values from the current page DOM based on detected page type.
 * Returns only the fields that could be found.
 */
export function extractFromPage(pageType: PageType): Partial<Record<ConfigKey, string>> {
  const values: Partial<Record<ConfigKey, string>> = {};

  if (pageType === 'oidc-app') {
    // Try data-se attribute first (Okta admin console pattern)
    const clientIdEl =
      document.querySelector('[data-se="client-id"] input') as HTMLInputElement ??
      document.querySelector('[data-se="client-id"]') as HTMLElement;
    if (clientIdEl) {
      values.clientId = (clientIdEl as HTMLInputElement).value || clientIdEl.textContent?.trim() || '';
    }
    // Fallback: regex for 0oa... pattern in page text
    if (!values.clientId) {
      const match = document.body.innerText.match(/\b(0oa[a-zA-Z0-9]{10,})\b/);
      if (match) values.clientId = match[1];
    }
  }

  if (pageType === 'workload-principal') {
    // WLP ID from URL path
    const urlMatch = window.location.pathname.match(/\/workload\/(wlp_[a-zA-Z0-9]+)/);
    if (urlMatch) {
      values.agentClientId = urlMatch[1];
    }
    // Fallback: search page for wlp_ pattern
    if (!values.agentClientId) {
      const match = document.body.innerText.match(/\b(wlp_[a-zA-Z0-9]+)\b/);
      if (match) values.agentClientId = match[1];
    }
  }

  return values;
}
