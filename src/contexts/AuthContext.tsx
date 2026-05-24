'use client';

import { useToast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/error-handler';
import { User } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface AuthContextProps {
  children: ReactNode;
}

export type SignInData = {
  document: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  logout: () => Promise<void>;
  updateSession: (token: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

const AUTH_SYNC_KEY = 'summit.auth.sync';

export function AuthProvider({ children }: AuthContextProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const syncListenerRef = useRef<((e: StorageEvent) => void) | null>(null);

  const isAuthenticated = !!user;

  const fetchCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        setUser(null);
        return null;
      }
      const data = await res.json();
      const fetchedUser = data?.user ?? null;
      setUser(fetchedUser);
      return fetchedUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  function syncAuthEvent(action: 'signin' | 'logout') {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(AUTH_SYNC_KEY, JSON.stringify({ action, timestamp: Date.now() }));
      setTimeout(() => localStorage.removeItem(AUTH_SYNC_KEY), 100);
    } catch {
      // silently ignore
    }
  }

  async function signIn({ document, password }: SignInData) {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ document, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorToast = handleApiError({
          statusCode: data.statusCode ?? res.status,
          message: data.message ?? data.error,
        });
        toast(errorToast);
        return;
      }

      if (!data?.user) {
        toast({
          variant: 'destructive',
          title: 'Credenciais inválidas',
          description: 'O CPF ou senha informados estão incorretos. Verifique suas credenciais e tente novamente.',
        });
        return;
      }

      setUser(data.user);
      syncAuthEvent('signin');
    } catch (error) {
      const errorToast = handleApiError(
        error && typeof error === 'object' && 'statusCode' in error
          ? (error as { statusCode?: number; message?: string })
          : error
      );
      toast(errorToast);
    }
  }

  const updateSession = useCallback(
    async (token: string) => {
      try {
        const res = await fetch('/api/auth/update-session', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ accessToken: token }),
        });

        if (!res.ok) return;

        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          syncAuthEvent('signin');
          router.replace('/dashboard');
        }
      } catch {
        // silently ignore
      }
    },
    [router]
  );

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    syncAuthEvent('logout');
    router.push('/sign-in');
  }

  // Sincronização entre abas
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key !== AUTH_SYNC_KEY || !e.newValue) return;

      try {
        const { action } = JSON.parse(e.newValue) as { action: string };

        if (action === 'signin') {
          await fetchCurrentUser();
        } else if (action === 'logout') {
          setUser(null);
          const isProtectedPage =
            pathname?.startsWith('/dashboard') ||
            pathname?.startsWith('/advertise') ||
            pathname?.startsWith('/announcement');
          if (isProtectedPage) {
            router.push('/sign-in');
          }
        }
      } catch {
        // silently ignore
      }
    };

    window.addEventListener('storage', handleStorageChange);
    syncListenerRef.current = handleStorageChange;

    return () => {
      if (syncListenerRef.current) {
        window.removeEventListener('storage', syncListenerRef.current);
      }
    };
  }, [pathname, router, fetchCurrentUser]);

  // Redireciona para /dashboard quando o usuário se autentica em página de auth
  useEffect(() => {
    const isAuthPage = pathname === '/sign-in' || pathname === '/register';
    if (user && isAuthPage) {
      router.replace('/dashboard');
    }
  }, [user, pathname, router]);

  // Hidrata o estado de auth na montagem inicial
  useEffect(() => {
    setIsLoading(true);
    fetchCurrentUser().finally(() => setIsLoading(false));
  }, [fetchCurrentUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, user, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
}
