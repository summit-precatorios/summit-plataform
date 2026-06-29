import { fonts } from './fonts';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' suppressHydrationWarning className={fonts.inter.className}>
      <body>{children}</body>
    </html>
  );
}
