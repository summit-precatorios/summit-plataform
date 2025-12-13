import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { PermissionProvider } from '@/providers/PermissionProvider';
import { fonts } from './fonts';
import './globals.css';
import { Header } from './header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      className={fonts.inter.className}
    >
      <body>
        <Toaster />
        <AuthProvider>
          <Header />
          <PermissionProvider>{children}</PermissionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
