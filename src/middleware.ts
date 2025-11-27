import { NextRequest, NextResponse } from 'next/server';

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
const protectedRoutes = ['/dashboard', '/advertise', '/announcement'] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('summit.token')?.value;

  const publicRoute = publicRoutes.find((route) => {
    if (route.isDynamic) {
      return path.startsWith(route.path);
    } else {
      return route.path === path;
    }
  });

  // Verifica se a rota é uma rota protegida conhecida
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  )

  // Se não for rota pública nem protegida conhecida, permite que o Next.js processe
  // (isso permite que páginas 404 sejam exibidas normalmente)
  if (!publicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // Redireciona apenas se for uma rota protegida conhecida e não houver token
  if (!authToken && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)).*)',
  ],
};
