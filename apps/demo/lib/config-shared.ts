/** Shared config types and field definitions — safe for client and server import. */

export const CONFIG_COOKIE_NAME = 'jag_config';

export interface DemoConfig {
  clientId: string;
  clientSecret: string;
  oktaIssuer: string;
  redirectUri: string;
  agentClientId: string;
  agentPrivateKeyJwk: string;
  agentKeyId: string;
  jagIssuer: string;
  jagAudience: string;
  jagTargetAudience: string;
  jagScope: string;
  resourceAudience: string;
  resourceTokenEndpoint: string;
}

export const CONFIG_FIELDS: {
  group: string;
  fields: { key: keyof DemoConfig; label: string; placeholder: string; multiline?: boolean }[];
}[] = [
  {
    group: 'OIDC Client',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: '0oa...' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Client secret from Okta' },
      { key: 'oktaIssuer', label: 'Okta Issuer', placeholder: 'https://your-domain.okta.com' },
      { key: 'redirectUri', label: 'Redirect URI', placeholder: 'https://o4aa-demo.vercel.app/api/auth/callback' },
    ],
  },
  {
    group: 'AI Agent',
    fields: [
      { key: 'agentClientId', label: 'Agent Client ID', placeholder: '0oa...' },
      { key: 'agentPrivateKeyJwk', label: 'Agent Private Key (JWK)', placeholder: '{"alg":"RS256","kty":"RSA",...}', multiline: true },
      { key: 'agentKeyId', label: 'Agent Key ID', placeholder: 'kid from Okta' },
    ],
  },
  {
    group: 'JAG Token Exchange',
    fields: [
      { key: 'jagIssuer', label: 'JAG Issuer', placeholder: 'https://your-domain.okta.com/oauth2' },
      { key: 'jagAudience', label: 'JAG Audience', placeholder: 'https://your-domain.okta.com/oauth2/v1/token' },
      { key: 'jagTargetAudience', label: 'JAG Target Audience', placeholder: 'https://your-domain.okta.com/oauth2/<auth-server-id>' },
      { key: 'jagScope', label: 'JAG Scope', placeholder: 'ai_agent' },
    ],
  },
  {
    group: 'Resource Server',
    fields: [
      { key: 'resourceAudience', label: 'Resource Audience', placeholder: 'https://your-domain.okta.com/oauth2/<id>/v1/token' },
      { key: 'resourceTokenEndpoint', label: 'Resource Token Endpoint', placeholder: 'https://your-domain.okta.com/oauth2/<id>/v1/token' },
    ],
  },
];
