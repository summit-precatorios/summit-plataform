'use client'
import { useToast } from '@/components/ui/use-toast'
import { signInRequest } from '@/services/auth'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
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

      console.log(response)

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Erro interno',
          description: 'Não foi possível processar a sua requisição',
        })

        console.log('entrou no primeiro if')
        return
      }

      if (response && response.statusCode === 401) {
        toast({
          variant: 'destructive',
          title: 'Falha de Autenticação',
          description: 'Credenciais de acesso inválidas ou não registradas',
        })

        return
      }

      const { accessToken: token } = response

      if (!token)
        toast({
          variant: 'destructive',
          title: 'Falha de Autenticação',
          description: 'Credenciais de acesso inválidas ou não registradas',
        })

      setCookie(undefined, 'summit.token', token, {
        maxAge: 60 * 60 * 1, // expires in 1 hour
      })

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }
  }

  useEffect(() => {
    const { 'summit.token': token } = parseCookies()

    if (token) {
      const tokenDecoded = jwtDecode(token as string)

      console.log(tokenDecoded.payload)

      setUser(tokenDecoded.payload)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
