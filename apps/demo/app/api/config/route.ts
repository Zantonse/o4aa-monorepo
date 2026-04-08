import { NextRequest, NextResponse } from 'next/server';
import { encrypt, decrypt } from '@/lib/session';
import { CONFIG_COOKIE_NAME, type DemoConfig } from '@/lib/config-shared';

/** GET — return the saved config so the form can reload it. Secrets are masked. */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const raw = req.cookies.get(CONFIG_COOKIE_NAME)?.value;
  if (!raw) {
    return NextResponse.json({ config: null });
  }
  const saved = decrypt(raw) as DemoConfig | null;
  if (!saved || !saved.clientId) {
    return NextResponse.json({ config: null });
  }

  // Mask only the client secret — show enough to confirm it's set
  // Do NOT mask the JWK — it must be valid JSON if re-saved, and the user
  // needs to verify key details. This endpoint is same-origin + HttpOnly cookie only.
  const masked: DemoConfig = {
    ...saved,
    clientSecret: saved.clientSecret ? '\u2022'.repeat(8) : '',
  };

  return NextResponse.json({ config: masked });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as DemoConfig;

    // Validate that at least the critical fields are present
    if (!body.clientId || !body.oktaIssuer || !body.agentClientId) {
      return NextResponse.json(
        { error: 'Missing required fields: clientId, oktaIssuer, agentClientId' },
        { status: 400 },
      );
    }

    // If the client secret is a masked placeholder (dots), preserve the existing value
    const MASK = '\u2022'.repeat(8);
    if (body.clientSecret === MASK || body.clientSecret === '••••••••') {
      const existingRaw = req.cookies.get(CONFIG_COOKIE_NAME)?.value;
      if (existingRaw) {
        const existing = decrypt(existingRaw) as DemoConfig | null;
        if (existing?.clientSecret) {
          body.clientSecret = existing.clientSecret;
        }
      }
    }

    // Encrypt the config into a cookie
    const cookieValue = encrypt(body);
    const cookieHeader = [
      `${CONFIG_COOKIE_NAME}=${cookieValue}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=86400', // 24 hours
      ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
    ].join('; ');

    const response = NextResponse.json({ ok: true });
    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json({ ok: true });
  response.headers.set(
    'Set-Cookie',
    `${CONFIG_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
