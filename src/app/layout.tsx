import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { fonts } from './fonts'
import './globals.css'
import { Header } from './header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={fonts.inter.className}
    >
      <body>
        <Toaster />
        <AuthProvider>
          <Header />

          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
