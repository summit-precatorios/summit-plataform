import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

function isTokenValid(token: string): boolean {
  try {
    const payload = decodeJwt(token);
    if (!payload.exp) return false;
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

const publicRoutes = [
  {
    path: '/',
    whenAuthenticated: 'no-redirect',
    isDynamic: false,
  },
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
    path: '/about',
    whenAuthenticated: 'no-redirect',
    isDynamic: false,
  },
  {
    path: '/contact',
    whenAuthenticated: 'no-redirect',
    isDynamic: false,
  },
  {
    path: '/faq',
    whenAuthenticated: 'no-redirect',
    isDynamic: false,
  },
  {
    path: '/terms',
    whenAuthenticated: 'no-redirect',
    isDynamic: false,
  },
  {
    path: '/privacy',
    whenAuthenticated: 'no-redirect',
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
] as const;

// Rotas protegidas que requerem autenticação
const protectedRoutes = ['/dashboard', '/advertise', '/announcement'] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const rawToken = request.cookies.get('summit.token')?.value;
  const isAuthenticated = !!rawToken && isTokenValid(rawToken);

  const publicRoute = publicRoutes.find((route) => {
    if (route.isDynamic) {
      return path.startsWith(route.path);
    } else {
      return route.path === path;
    }
  });

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (!publicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated && publicRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)).*)',
  ],
};
