import { FOOTER_LINKS } from '@/config/navigation';
import Link from 'next/link';

export function Footer() {
  return (
    <div className='bg-brand-dark mt-12 flex items-center h-28 bottom-0 fixed w-full'>
      <div className='container mx-auto flex justify-evenly items-center'>
        {FOOTER_LINKS.map(({ href, label }) => (
          <Link key={href} className='text-brand-gold font-semibold' href={href}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
