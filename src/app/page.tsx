import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-8">
          <div className="text-center">
            <Image
              src="/logo.svg"
              width="250"
              height="250"
              alt="file drive logo"
              className="inline-block mb-8"
            />

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Descubra a maneira mais simples de localizar, adquirir ou negociar
              seus precatórios.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Registre-se agora e inicie suas negociações.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="/register" className="text-white">
                  Crie sua conta
                </Link>
              </Button>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Leia mais <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
