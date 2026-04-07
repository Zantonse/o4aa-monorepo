import type { ConfigState, ConfigKey, FieldSource, FieldState } from './config-types';
import { EMPTY_STATE } from './config-types';

const STORAGE_KEY = 'configState';
const HOSTNAME_KEY = 'oktaHostname';
const AUTH_SERVER_KEY = 'authServerId';

export async function getState(): Promise<ConfigState> {
  const result = await chrome.storage.session.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as ConfigState) ?? { ...EMPTY_STATE };
}

export async function mergeValues(
  values: Partial<Record<ConfigKey, string>>,
  source: FieldSource,
): Promise<ConfigState> {
  const state = await getState();
  for (const [key, value] of Object.entries(values)) {
    if (value && value.trim()) {
      state[key as ConfigKey] = { value: value.trim(), source };
    }
  }
  await chrome.storage.session.set({ [STORAGE_KEY]: state });
  return state;
}

export async function setField(key: ConfigKey, value: string, source: FieldSource): Promise<void> {
  const state = await getState();
  state[key] = { value, source };
  await chrome.storage.session.set({ [STORAGE_KEY]: state });
}

export async function clearState(): Promise<void> {
  await chrome.storage.session.clear();
}

export async function getHostname(): Promise<string | null> {
  const result = await chrome.storage.session.get(HOSTNAME_KEY);
  return (result[HOSTNAME_KEY] as string) ?? null;
}

export async function setHostname(hostname: string): Promise<void> {
  await chrome.storage.session.set({ [HOSTNAME_KEY]: hostname });
}

export async function getAuthServerId(): Promise<string | null> {
  const result = await chrome.storage.session.get(AUTH_SERVER_KEY);
  return (result[AUTH_SERVER_KEY] as string) ?? null;
}

export async function setAuthServerId(id: string): Promise<void> {
  await chrome.storage.session.set({ [AUTH_SERVER_KEY]: id });
}

export function countFilled(state: ConfigState): { filled: number; total: number } {
  const entries = Object.values(state) as FieldState[];
  return {
    filled: entries.filter(f => f.value !== '').length,
    total: entries.length,
  };
}

export function buildDemoConfig(state: ConfigState): Record<string, string> {
  return Object.fromEntries(
    Object.entries(state).map(([k, v]) => [k, (v as FieldState).value])
  );
}
