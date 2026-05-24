import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.API_KEY!;

function getApiBase(): string {
  const url = process.env.API_URL ?? '';
  return url.endsWith('/') ? url : `${url}/`;
}

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const apiBase = getApiBase();
  const targetUrl = new URL(path.join('/'), apiBase);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  const cookieStore = await cookies();
  const token = cookieStore.get('summit.token')?.value;

  const forwardHeaders = new Headers();
  forwardHeaders.set('x-api-key', API_KEY);

  if (token) {
    forwardHeaders.set('authorization', `Bearer ${token}`);
  }

  const contentType = request.headers.get('content-type');
  if (contentType) {
    forwardHeaders.set('content-type', contentType);
  }

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const body = hasBody ? await request.arrayBuffer() : undefined;

  try {
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: forwardHeaders,
      body,
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.arrayBuffer();
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Proxy error' }, { status: 502 });
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
};
