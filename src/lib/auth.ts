import { jwtDecode } from 'jwt-decode';

export const TOKEN_COOKIE_NAME = 'summit.token';

export interface JwtPayload {
  payload: {
    name: string;
    email: string;
    image: string | null;
    document: string;
    isActive: boolean;
  };
  roles: string[];
  exp: number;
  iat: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function decodeJwt<T>(token: string): T | null {
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
}

