import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authenticationToken = request.cookies.get('summit.token')?.value

  const protectedRoutes = ['/dashboard', '/settings', '/advertise']

  const isProtectedRoutes = protectedRoutes.includes(request.nextUrl.pathname)

  if (isProtectedRoutes && !authenticationToken) {
    const SIGNIN_BASE_URL = new URL('/signin', request.url)

    SIGNIN_BASE_URL.searchParams.set('unauthorized', 'true')

    return NextResponse.redirect(SIGNIN_BASE_URL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/advertise/:path*', '/settings/:path*'],
}
