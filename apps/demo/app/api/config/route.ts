import { NextRequest, NextResponse } from 'next/server';
import { encrypt, serializeCookie } from '@/lib/session';
import { CONFIG_COOKIE_NAME, type DemoConfig } from '@/lib/config-shared';

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
