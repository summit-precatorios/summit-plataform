import './globals.css'
import { Providers } from './providers'
import { fonts } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={fonts.inter.className}>
      <Providers>{children}</Providers>
    </html>
  )
}
