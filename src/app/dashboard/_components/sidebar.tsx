import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, Scale, TrendingUp } from 'lucide-react';

interface SidebarProps {
  className: string | undefined;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-4 px-4 text-xl font-bold tracking-tight text-gray-900'>
            Meus Títulos
          </h2>
          <div className='space-y-2'>
            <Button
              variant='secondary'
              className='w-full justify-start bg-brand/10 hover:bg-brand/20 text-gray-900 border-2 border-brand/30'
            >
              <Scale size={20} className='mr-3 text-brand' />
              <span className='font-semibold'>Precatórios</span>
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start hover:bg-gray-100 text-gray-700'
            >
              <FileText size={20} className='mr-3 text-blue-600' />
              <span className='font-medium'>RPVs</span>
            </Button>
          </div>
        </div>

        <div className='px-3 py-2'>
          <h2 className='mb-4 px-4 text-xl font-bold tracking-tight text-gray-900'>
            Análise
          </h2>
          <div className='space-y-2'>
            <Card className='border-2 border-blue-200 bg-blue-50/50'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-lg bg-blue-100'>
                    <TrendingUp className='h-4 w-4 text-blue-600' />
                  </div>
                  <CardTitle className='text-sm font-semibold text-gray-900'>
                    Visão Geral
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-0'>
                <p className='text-xs text-gray-600'>
                  Acompanhe o status dos seus anúncios e estatísticas de
                  negociação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='px-3 py-2'>
          <h2 className='mb-4 px-4 text-xl font-bold tracking-tight text-gray-900'>
            Ajuda
          </h2>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start hover:bg-gray-100 text-gray-700'
              onClick={() => (window.location.href = '/faq')}
            >
              <FileText size={20} className='mr-3 text-purple-600' />
              <span className='font-medium'>FAQ</span>
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start hover:bg-gray-100 text-gray-700'
              onClick={() => (window.location.href = '/contact')}
            >
              <FileText size={20} className='mr-3 text-green-600' />
              <span className='font-medium'>Suporte</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
