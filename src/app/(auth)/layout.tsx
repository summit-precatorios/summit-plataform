import { NavBar } from '@/components/NavBar'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
