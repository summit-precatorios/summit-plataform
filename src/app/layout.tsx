import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { fonts } from './fonts';
import './globals.css';
import { Header } from './header';
import { PermissionProvider } from '@/providers/PermissionProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          <PermissionProvider>{children}</PermissionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
