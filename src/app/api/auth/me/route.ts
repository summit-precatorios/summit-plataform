import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('summit.token')?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const decoded = decodeJwtPayload(token);

  if (!decoded) {
    cookieStore.delete('summit.token');
    return NextResponse.json(null, { status: 401 });
  }

  const exp = decoded.exp as number | undefined;
  if (!exp || Date.now() >= exp * 1000) {
    cookieStore.delete('summit.token');
    return NextResponse.json(null, { status: 401 });
  }

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
