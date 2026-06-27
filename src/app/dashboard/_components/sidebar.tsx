'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, HelpCircle, Mail } from 'lucide-react';

interface SidebarProps {
  className: string | undefined;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ className, activeTab, onTabChange }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-4 px-4 text-xl font-bold tracking-tight text-gray-900'>
            Meus Títulos
          </h2>
          <div className='space-y-1'>
            <button
              onClick={() => onTabChange('announcements')}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2 rounded-r-md border-l-[3px] text-sm transition-all',
                activeTab === 'announcements'
                  ? 'border-brand bg-brand/5 text-amber-800 font-semibold'
                  : 'border-transparent text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className='flex items-center gap-2'>
                <Clock size={16} className={activeTab === 'announcements' ? 'text-brand' : 'text-gray-400'} />
                Aguardando
              </span>
            </button>

            <button
              onClick={() => onTabChange('announcements-approved')}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2 rounded-r-md border-l-[3px] text-sm transition-all',
                activeTab === 'announcements-approved'
                  ? 'border-brand bg-brand/5 text-amber-800 font-semibold'
                  : 'border-transparent text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className='flex items-center gap-2'>
                <CheckCircle2 size={16} className={activeTab === 'announcements-approved' ? 'text-brand' : 'text-gray-400'} />
                Anunciados
              </span>
            </button>
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
              <HelpCircle size={20} className='mr-3 text-purple-600' />
              <span className='font-medium'>FAQ</span>
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start hover:bg-gray-100 text-gray-700'
              onClick={() => (window.location.href = '/contact')}
            >
              <Mail size={20} className='mr-3 text-green-600' />
              <span className='font-medium'>Suporte</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
