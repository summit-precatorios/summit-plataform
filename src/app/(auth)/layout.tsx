import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="container mx-auto pt-12">
      <div className="w-full">{children}</div>
    </main>
  )
}
