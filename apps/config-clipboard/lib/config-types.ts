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

export type ConfigKey = keyof DemoConfig;

export const CONFIG_KEYS: ConfigKey[] = [
  'clientId', 'clientSecret', 'oktaIssuer', 'redirectUri',
  'agentClientId', 'agentPrivateKeyJwk', 'agentKeyId',
  'jagIssuer', 'jagAudience', 'jagTargetAudience', 'jagScope',
  'resourceAudience', 'resourceTokenEndpoint',
];

export type FieldSource = 'auto' | 'derived' | 'manual' | 'pending';

export interface FieldState {
  value: string;
  source: FieldSource;
}

export type ConfigState = Record<ConfigKey, FieldState>;

export const EMPTY_STATE: ConfigState = Object.fromEntries(
  CONFIG_KEYS.map(k => [k, { value: '', source: 'pending' as FieldSource }])
) as ConfigState;

export interface ConfigGroup {
  label: string;
  fields: { key: ConfigKey; label: string }[];
}

export const CONFIG_GROUPS: ConfigGroup[] = [
  {
    label: 'OIDC Client',
    fields: [
      { key: 'clientId', label: 'Client ID' },
      { key: 'clientSecret', label: 'Client Secret' },
      { key: 'oktaIssuer', label: 'Okta Issuer' },
      { key: 'redirectUri', label: 'Redirect URI' },
    ],
  },
  {
    label: 'AI Agent',
    fields: [
      { key: 'agentClientId', label: 'Agent Client ID' },
      { key: 'agentPrivateKeyJwk', label: 'Private Key (JWK)' },
      { key: 'agentKeyId', label: 'Agent Key ID' },
    ],
  },
  {
    label: 'JAG Token Exchange',
    fields: [
      { key: 'jagIssuer', label: 'JAG Issuer' },
      { key: 'jagAudience', label: 'JAG Audience' },
      { key: 'jagTargetAudience', label: 'JAG Target Audience' },
      { key: 'jagScope', label: 'JAG Scope' },
    ],
  },
  {
    label: 'Resource Server',
    fields: [
      { key: 'resourceAudience', label: 'Resource Audience' },
      { key: 'resourceTokenEndpoint', label: 'Resource Token Endpoint' },
    ],
  },
];
