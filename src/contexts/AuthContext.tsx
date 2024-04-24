'use client'
import { useToast } from '@/components/ui/use-toast'
import { signInRequest } from '@/services/auth'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface AuthContextProps {
  children: ReactNode
}

type User = {
  name: string
  email: string
  image: string
  document: string
}

type SignInData = {
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
  const router = useRouter() // Inicialize o useRouter
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

      const tokenDecoded = jwtDecode(token as string)

      setUser(tokenDecoded.payload)

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

    router.push('/signin')
  }

  useEffect(() => {
    const { 'summit.token': token } = parseCookies()

    if (token) {
      const tokenDecoded = jwtDecode(token as string)

      setUser(tokenDecoded.payload)

      router.push('/dashboard')
    } else {
      router.push('/signin')
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
