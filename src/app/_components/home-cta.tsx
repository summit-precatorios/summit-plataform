'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type HomeCtaProps = {
  variant: 'hero' | 'footer';
};

export function HomeCta({ variant }: HomeCtaProps) {
  const { isAuthenticated } = useAuth();

  if (variant === 'footer') {
    if (isAuthenticated) return null;

    return (
      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <Button
          asChild
          size='lg'
          variant='secondary'
          className='h-14 px-8 text-lg'
        >
          <Link href='/register'>
            Criar conta gratuita
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='mt-10 flex items-center justify-center gap-x-6 flex-wrap gap-y-4'>
      {!isAuthenticated ? (
        <>
          <Button asChild size='lg' className='h-14 px-8 text-lg'>
            <Link href='/register'>
              Criar conta gratuita
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </Button>
          <Button asChild variant='outline' size='lg' className='h-14 px-8 text-lg'>
            <Link href='/sign-in'>Já tenho uma conta</Link>
          </Button>
        </>
      ) : (
        <Button asChild size='lg' className='h-14 px-8 text-lg'>
          <Link href='/dashboard'>
            Acessar Dashboard
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </Button>
      )}
    </div>
  );
}
