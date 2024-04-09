import './globals.css'
import { fonts } from './fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Header } from './header'
import { Footer } from './footer'

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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fonts.inter,
        )}
      >
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
