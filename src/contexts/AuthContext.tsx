'use client'

import { useToast } from '@/components/ui/use-toast'
import { handleApiError } from '@/lib/error-handler'
import { signInRequest } from '@/services/auth.service'
import { User } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface AuthContextProps {
  children: ReactNode
}

export type SignInData = {
  document: string
  password: string
}
type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

// Chave para sincronização entre abas
const AUTH_SYNC_KEY = 'summit.auth.sync'
const TOKEN_COOKIE_NAME = 'summit.token'

export function AuthProvider({ children }: AuthContextProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const isInitialMount = useRef(true)
  const syncListenerRef = useRef<((e: StorageEvent) => void) | null>(null)

  const isAuthenticated = !!user

  // Função para decodificar token e atualizar usuário
  const decodeTokenAndSetUser = useCallback((token: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecoded: { payload: any; roles: string[] } = jwtDecode(
        token as string,
      )

      const { payload, roles } = tokenDecoded

      const data: User = {
        ...payload,
        roles,
      }

      setUser(data)
      return data
    } catch (error) {
      console.error('error_decoding_token', error)
      destroyCookie(null, TOKEN_COOKIE_NAME)
      setUser(null)
      return null
    }
  }, [])

  // Função para sincronizar token entre abas
  const syncTokenToOtherTabs = useCallback((token: string | null) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          AUTH_SYNC_KEY,
          JSON.stringify({ token, timestamp: Date.now() }),
        )
        // Remove o item imediatamente para evitar acúmulo
        // O evento storage será disparado mesmo assim
        setTimeout(() => {
          localStorage.removeItem(AUTH_SYNC_KEY)
        }, 100)
      }
    } catch (error) {
      console.warn('Could not sync token to other tabs', error)
    }
  }, [])

  async function signIn({ document, password }: SignInData) {
    try {
      const response = await signInRequest({ document, password })

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Erro interno',
          description: 'Não foi possível processar a sua requisição',
        })

        return
      }

      // Verifica se a resposta contém um erro
      if ('statusCode' in response && response.statusCode >= 400) {
        const errorToast = handleApiError({
          statusCode: response.statusCode,
          message: response.message || response.error,
        })
        toast(errorToast)
        return
      }

      const { accessToken: token } = response

      if (!token) {
        toast({
          variant: 'destructive',
          title: 'Credenciais inválidas',
          description:
            'O CPF ou senha informados estão incorretos. Verifique suas credenciais e tente novamente.',
        })

        return
      }

      setCookie(undefined, TOKEN_COOKIE_NAME, token, {
        maxAge: 60 * 60 * 1, // expires in 1 hour
      })

      // Atualiza o usuário
      const userData = decodeTokenAndSetUser(token)

      // Sincroniza com outras abas
      syncTokenToOtherTabs(token)

      // Aguarda um pequeno delay para garantir que o cookie seja setado
      // e o estado seja atualizado antes do redirecionamento
      if (userData) {
        setTimeout(() => {
          router.replace('/dashboard')
        }, 100)
      }
    } catch (error) {
      // Trata erros com statusCode quando disponível
      const errorToast = handleApiError(
        error && typeof error === 'object' && 'statusCode' in error
          ? (error as { statusCode?: number; message?: string })
          : error,
      )
      toast(errorToast)
    }
  }

  async function logout() {
    destroyCookie(null, TOKEN_COOKIE_NAME)

    setUser(null)

    // Sincroniza logout com outras abas
    syncTokenToOtherTabs(null)

    router.push('/sign-in')
  }

  // Sincronização entre abas - escuta mudanças no localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      // Ignora eventos que não são relacionados à autenticação
      if (e.key !== AUTH_SYNC_KEY) return

      try {
        // Se newValue é null, significa que foi removido (logout)
        if (!e.newValue) {
          const { 'summit.token': currentToken } = parseCookies()
          if (currentToken) {
            destroyCookie(null, TOKEN_COOKIE_NAME)
            setUser(null)
            // Redireciona para login se estiver em página protegida
            const isProtectedPage =
              pathname?.startsWith('/dashboard') ||
              pathname?.startsWith('/advertise') ||
              pathname?.startsWith('/announcement')
            if (isProtectedPage) {
              router.push('/sign-in')
            }
          }
          return
        }

        const syncData = JSON.parse(e.newValue)
        const { token } = syncData

        if (token) {
          // Token foi atualizado em outra aba
          const { 'summit.token': currentToken } = parseCookies()
          if (currentToken !== token) {
            // Atualiza o cookie
            setCookie(undefined, TOKEN_COOKIE_NAME, token, {
              maxAge: 60 * 60 * 1,
            })
            decodeTokenAndSetUser(token)
          }
        }
      } catch (error) {
        console.error('error_handling_storage_sync', error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    syncListenerRef.current = handleStorageChange

    return () => {
      if (syncListenerRef.current) {
        window.removeEventListener('storage', syncListenerRef.current)
      }
    }
  }, [pathname, router, decodeTokenAndSetUser])

  // Verifica token inicial e em mudanças de rota (mas não redireciona na página de ativação)
  useEffect(() => {
    const { 'summit.token': token } = parseCookies()

    // Evita redirecionamento automático na página de ativação ou reset de senha
    const isActivationPage = pathname?.startsWith('/active/account')
    const isResetPasswordPage = pathname?.startsWith('/reset/password')
    const shouldSkipRedirect = isActivationPage || isResetPasswordPage

    if (token && !user) {
      const userData = decodeTokenAndSetUser(token)

      // Só redireciona se não estiver em páginas especiais e for o primeiro mount
      if (userData && !shouldSkipRedirect && isInitialMount.current) {
        router.push('/dashboard')
      }
    } else if (!token && user) {
      // Token foi removido (logout em outra aba, por exemplo)
      setUser(null)
    }

    // Marca que o mount inicial foi concluído
    if (isInitialMount.current) {
      isInitialMount.current = false
    }
  }, [user, pathname, router, decodeTokenAndSetUser])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
