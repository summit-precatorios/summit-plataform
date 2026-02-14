import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  isActive?: boolean;
  className?: string;
  children: ReactNode;
};

export function NavLink({
  href,
  isActive = false,
  className,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors rounded-md',
        isActive
          ? 'bg-brand/10 text-brand'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
        className
      )}
    >
      {children}
    </Link>
  );
}
