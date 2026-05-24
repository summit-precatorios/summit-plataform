import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  try {
    const decoded = decodeJwt(accessToken);

    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
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
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
