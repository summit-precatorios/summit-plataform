import Link from 'next/link';

export function Footer() {
  return (
    <div className='bg-[#0B1E2C] mt-12 flex items-center h-28 bottom-0 fixed w-full'>
      <div className='container mx-auto flex justify-evenly items-center'>
        <Link className='text-[#facc15] font-semibold' href='/privacy'>
          Aviso de Privacidade
        </Link>
        <Link className='text-[#facc15] font-semibold' href='/terms-of-service'>
          Termos de Serviço
        </Link>
        <Link className='text-[#facc15] font-semibold' href='/about'>
          Sobre
        </Link>
      </div>
    </div>
  );
}
