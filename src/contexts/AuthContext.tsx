'use client'

import { useToast } from '@/components/ui/use-toast'
import { signInRequest } from '@/services/auth'
import { jwtDecode } from 'jwt-decode'
import { setCookie } from 'nookies'
import { ReactNode, createContext, useState } from 'react'

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

      const payload: User = jwtDecode(token as string)

      setUser(payload)
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
