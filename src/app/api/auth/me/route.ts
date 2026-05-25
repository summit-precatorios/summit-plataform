import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { decodeToken } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('summit.token')?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    cookieStore.delete('summit.token');
    return NextResponse.json(null, { status: 401 });
  }

  if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
    cookieStore.delete('summit.token');
    return NextResponse.json(null, { status: 401 });
  }

  const { payload: userPayload, roles } = decoded;

  return NextResponse.json({ user: { ...userPayload, roles } });
}
