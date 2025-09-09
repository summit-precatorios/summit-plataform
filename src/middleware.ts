import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = [
  {
    path: '/sign-in',
    whenAuthenticated: 'redirect',
    isDynamic: false,
  },
  {
    path: '/register',
    whenAuthenticated: 'redirect',
    isDynamic: false,
  },
  {
    path: '/active/account/',
    whenAuthenticated: 'no-redirect', // Evita redirecionamento
    isDynamic: true,
  },
  {
    path: '/reset/password',
    whenAuthenticated: 'no-redirect', // Alterado para evitar redirecionamento
    isDynamic: true,
  },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get('summit.token')?.value

  const publicRoute = publicRoutes.find((route) => {
    if (route.isDynamic) {
      return path.startsWith(route.path)
    } else {
      return route.path === path
    }
  })

  // Verificação específica para /active/account/<token>
  if (path.startsWith('/active/account')) {
    return NextResponse.next() // Permite o acesso sem redirecionamento
  }

  // Verificação específica para /reset/password/
  if (path.startsWith('/reset/password')) {
    return NextResponse.next() // Permite o acesso sem redirecionamento
  }

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && !publicRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)).*)',
  ],
}
