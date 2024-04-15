'use client'

import { signInRequest } from '@/services/auth'
import { ReactNode, createContext, useState } from 'react'
import { setCookie } from 'nookies'
import { jwtDecode } from 'jwt-decode'

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
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  async function signIn({ document, password }: SignInData) {
    const token = await signInRequest({ document, password })

    setCookie(undefined, 'summit.token', token, {
      maxAge: 60 * 60 * 1, // expires in 1 hour
    })

    const payload: User = jwtDecode(token)

    console.log(payload)

    setUser(payload)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
