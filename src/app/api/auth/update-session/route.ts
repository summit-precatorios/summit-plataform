import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodeToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  const decoded = decodeToken(accessToken);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

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

  const { payload: userPayload, roles } = decoded;

  return NextResponse.json({ user: { ...userPayload, roles } });
}
