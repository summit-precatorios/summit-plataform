import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY!;

function getApiBase(): string {
  const url = process.env.API_URL ?? '';
  return url.endsWith('/') ? url : `${url}/`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${getApiBase()}auth/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || !data.accessToken) {
    return NextResponse.json(data, { status: res.status });
  }

  const decoded = decodeJwt(data.accessToken);
  const cookieStore = await cookies();

  cookieStore.set('summit.token', data.accessToken, {
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
