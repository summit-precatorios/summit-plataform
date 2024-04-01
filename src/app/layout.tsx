import './globals.css'
import { Providers } from './providers'
import { fonts } from './fonts'
import { NavBar } from '@/components/NavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={fonts.inter.className}>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
