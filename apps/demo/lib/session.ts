import crypto from 'crypto';

const ALGORITHM  = 'aes-256-gcm';
export const COOKIE_NAME = 'jag_session';
/** 15 minutes — long enough for demo flows, short enough to avoid stale sessions */
const COOKIE_MAX_AGE = 60 * 15;

// ─── Key derivation ──────────────────────────────────────────────────────────

// Hardcoded default for demo — acceptable since this is a demo app behind Vercel SSO
const DEFAULT_SECRET = 'o4aa-demo-session-key-not-for-production';

function getKey(): Buffer {
  const secret = process.env.SESSION_SECRET || DEFAULT_SECRET;
  return crypto.createHash('sha256').update(secret).digest();
}

// ─── Encrypt / Decrypt ───────────────────────────────────────────────────────

/**
 * Encrypts a JSON-serialisable object with AES-256-GCM.
 * Output layout (base64url): [12-byte IV][16-byte auth tag][ciphertext]
 */
export function encrypt(data: object): string {
  const iv      = crypto.randomBytes(12);
  const cipher  = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64url');
}

/**
 * Decrypts a token produced by `encrypt()`.
 * Returns `null` on any decryption / parse failure (tampered, wrong key, etc.)
 */
export function decrypt(token: string): object | null {
  try {
    const buf       = Buffer.from(token, 'base64url');
    const iv        = buf.subarray(0, 12);
    const tag       = buf.subarray(12, 28);
    const encrypted = buf.subarray(28);

    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString('utf8')) as object;
  } catch {
    return null;
  }
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

/** Serialises a Set-Cookie header string for the session cookie. */
export function serializeCookie(value: string): string {
  return [
    `${COOKIE_NAME}=${value}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
  ].join('; ');
}

/** Produces a header that clears the session cookie. */
export function clearCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

// ─── Typed session data ───────────────────────────────────────────────────────

export interface PKCESession {
  verifier:  string;
  challenge: string;
  state:     string;
}

export interface FlowStep {
  label:        string;
  endpoint:     string;
  params:       Record<string, string>;
  response?:    Record<string, unknown>;
  error?:       string;
  durationMs?:  number;
  rawRequest?:  string;
  rawResponse?: string;
  statusCode?:  number;
}

export interface FlowSession {
  idToken?:                string;
  jagToken?:               string;
  accessToken?:            string;
  jagClientAssertion?:     string;
  resourceClientAssertion?: string;
  steps:                   FlowStep[];
  completedAt?:            string;
  error?:                  string;
}
