import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Summit | Serviço Temporariamente Indisponível',
  description: 'A plataforma Summit está temporariamente indisponível. Voltaremos em breve.',
};

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6'>
      <div className='flex flex-col items-center text-center max-w-lg'>
        <Image
          src='/logo.svg'
          width={200}
          height={200}
          alt='Summit logo'
          className='mb-10 object-contain'
          priority
          quality={100}
        />

        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8 text-brand'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
              />
            </svg>
          </div>

          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            Serviço Temporariamente Indisponível
          </h1>

          <p className='text-lg text-gray-500 leading-relaxed'>
            Estamos realizando melhorias na plataforma.
            <br />
            Voltaremos em breve.
          </p>
        </div>

        <p className='text-sm text-gray-400 mt-4'>
          © {new Date().getFullYear()} Summit. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
