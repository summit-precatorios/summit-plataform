import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payloadB64] = token.split('.');
    if (!payloadB64) return null;
    const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  const decoded = decodeJwtPayload(accessToken);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const exp = decoded.exp as number | undefined;
  if (!exp || Date.now() >= exp * 1000) {
    return NextResponse.json({ error: 'Token expired' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('summit.token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60,
  });

  const userPayload = decoded.payload as {
    name: string;
    email: string;
    image: string | null;
    document: string;
    isActive: boolean;
  };
  const roles = (decoded.roles ?? []) as string[];

  return NextResponse.json({ user: { ...userPayload, roles } });
}
