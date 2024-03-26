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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
