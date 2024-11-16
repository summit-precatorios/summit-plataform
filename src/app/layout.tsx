import { PermissionWrapper } from '@/components/permission-wrapper'
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
          <PermissionWrapper>{children}</PermissionWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
