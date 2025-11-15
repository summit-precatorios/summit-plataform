'use client'

import { useToast } from '@/components/ui/use-toast'
import { signInRequest } from '@/services/auth.service'
import { User } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

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

export function AuthProvider({ children }: AuthContextProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

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

      const { accessToken: token } = response

      if (!token) {
        toast({
          variant: 'destructive',
          title: 'Falha de Autenticação',
          description: 'Credenciais de acesso inválidas ou não registradas',
        })

        return
      }

      setCookie(undefined, 'summit.token', token, {
        maxAge: 60 * 60 * 1, // expires in 1 hour
      })

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

      router.push('/dashboard')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }
  }

  async function logout() {
    destroyCookie(null, 'summit.token')

    setUser(null)

    router.push('/sign-in')
  }

  useEffect(() => {
    const { 'summit.token': token } = parseCookies()

    if (token && !user) {
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

        router.push('/dashboard')
      } catch (error) {
        console.error('error_decoding_token', error)
        destroyCookie(null, 'summit.token')
      }
    }
  }, [user, router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
