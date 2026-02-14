'use client';

import { useAuth } from '@/hooks/use-auth';
import { cpfMask } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle2,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function UserNav() {
  const { user, logout } = useAuth();

  function getFallBack() {
    if (!user?.name) return 'U';
    const firstLettersOfName = user.name.split(' ');
    let initials = '';

    if (firstLettersOfName) {
      for (let i = 0; i < 2 && i < firstLettersOfName.length; i++) {
        initials += firstLettersOfName[i].charAt(0).toUpperCase();
      }
    }

    return initials || 'U';
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-10 w-10 rounded-full border-2 border-transparent hover:border-brand/30 transition-all'
        >
          <Avatar className='h-10 w-10 border-2 border-gray-200'>
            {user?.image ? (
              <AvatarFallback className='bg-gradient-to-br from-brand to-brand-gold text-white font-semibold'>
                <Image
                  src={user.image}
                  alt={user.name || 'Avatar'}
                  className='rounded-full w-full h-full object-cover'
                  width={40}
                  height={40}
                />
              </AvatarFallback>
            ) : (
              <AvatarFallback className='bg-gradient-to-br from-brand to-brand-gold text-white font-semibold text-sm'>
                {getFallBack()}
              </AvatarFallback>
            )}
          </Avatar>
          {user?.isActive && (
            <span className='absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white shadow-sm' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='flex-1'>
                <p className='text-sm font-semibold leading-none text-gray-900'>
                  {user?.name || 'Usuário'}
                </p>
                <p className='text-xs leading-none text-gray-500 mt-1 truncate'>
                  {user?.email || 'email@exemplo.com'}
                </p>
              </div>
              {user?.isActive ? (
                <Badge className='bg-green-100 text-green-800 hover:bg-green-100 text-xs'>
                  <CheckCircle2 className='h-3 w-3 mr-1' />
                  Ativo
                </Badge>
              ) : (
                <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs'>
                  <AlertCircle className='h-3 w-3 mr-1' />
                  Pendente
                </Badge>
              )}
            </div>
            {user?.document && (
              <p className='text-xs text-gray-400 font-mono'>
                CPF: {cpfMask(user.document)}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/dashboard' className='flex items-center w-full'>
              <LayoutDashboard className='mr-2 h-4 w-4 text-gray-500' />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/profile' className='flex items-center w-full'>
              <UserCircle className='mr-2 h-4 w-4 text-gray-500' />
              <span>Meu Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/settings' className='flex items-center w-full'>
              <Settings className='mr-2 h-4 w-4 text-gray-500' />
              <span>Configurações</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50'
          onClick={handleLogout}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
