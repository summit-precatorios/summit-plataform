'use client'
import { ReactNode, createContext } from 'react'

interface AuthContextProps {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProps) {
  const isAuthenticated = false

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
