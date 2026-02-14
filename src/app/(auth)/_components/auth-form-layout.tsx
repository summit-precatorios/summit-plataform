import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

type AuthFormLayoutProps = {
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export function AuthFormLayout({
  backHref,
  backLabel,
  children,
}: AuthFormLayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='mb-8'>
          <Link
            href={backHref}
            className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            {backLabel}
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
