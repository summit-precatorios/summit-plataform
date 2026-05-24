import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('summit.token')?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const decoded = decodeJwt(token);

    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
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
  } catch {
    cookieStore.delete('summit.token');
    return NextResponse.json(null, { status: 401 });
  }
}
