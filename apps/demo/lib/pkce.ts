import crypto from 'crypto';

export interface PKCEPair {
  verifier:  string;
  challenge: string;
  method:    'S256';
}

/**
 * Generates a cryptographically random PKCE verifier and its SHA-256
 * code_challenge.
 *
 * Verifier: 43–128 unreserved ASCII characters (RFC 7636).
 * Challenge: BASE64URL(SHA-256(verifier)).
 */
export async function generatePKCE(): Promise<PKCEPair> {
  // 32 random bytes → 43 base64url chars, comfortably within the 43-128 range
  const verifier = crypto.randomBytes(32).toString('base64url');

  const digest = crypto.createHash('sha256').update(verifier).digest();
  const challenge = digest.toString('base64url');

  return { verifier, challenge, method: 'S256' };
}

/**
 * Generates a random state parameter for CSRF protection.
 */
export function generateState(): string {
  return crypto.randomBytes(16).toString('base64url');
}
