import { SignJWT } from 'jose';
import crypto from 'crypto';

interface AssertionOptions {
  /** OAuth client ID — used as iss and sub */
  clientId: string;
  /** Token endpoint URL of the target authorization server */
  audience: string;
  /**
   * RSA/EC private key as a JWK object.
   * Typed as `crypto.JsonWebKey` (Node built-in) which includes the index
   * signature required by `crypto.createPrivateKey()`.
   */
  privateKeyJwk: crypto.JsonWebKey;
  /** kid header value — must match the public key registered at the AS */
  keyId: string;
}

/**
 * Creates a signed JWT Bearer client assertion for private_key_jwt auth.
 *
 * Conforms to RFC 7523 §2.2:
 *  - iss = client_id
 *  - sub = client_id
 *  - aud = token endpoint URL
 *  - iat / exp (60-second lifetime)
 *  - jti = random nonce
 */
export async function signJwtBearerAssertion(opts: AssertionOptions): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Import using Node's crypto — accepts a JWK object directly.
  const privateKey = crypto.createPrivateKey({
    key:    opts.privateKeyJwk,
    format: 'jwk',
  });

  const alg = (opts.privateKeyJwk as Record<string, unknown>).alg as string | undefined ?? 'RS256';

  return new SignJWT({
    jti: crypto.randomBytes(16).toString('hex'),
  })
    .setProtectedHeader({ alg, kid: opts.keyId })
    .setIssuer(opts.clientId)
    .setSubject(opts.clientId)
    .setAudience(opts.audience)
    .setIssuedAt(now)
    .setExpirationTime(now + 60)
    .sign(privateKey);
}
