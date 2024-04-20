import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.svg" width="100" height="100" alt="summit logo" />
        </Link>

        <div className="flex gap-12 items-center">
          <Link href="/contact">Contato</Link>
          <Button type="submit" className=" h-11" asChild>
            <Link href="/signin">Entrar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
