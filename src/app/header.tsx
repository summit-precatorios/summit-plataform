'use client'

import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { AuthContext } from '@/contexts/AuthContext'

import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

export function Header() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <div className="flex gap-12 items-center">
          <Link href="/" className="flex gap-2 items-center text-xl text-black">
            <Image src="/logo.svg" width="100" height="100" alt="summit logo" />
          </Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex gap-12 items-center">
          {/* <Link href="/privacy">Aviso de Privacidade</Link> */}
          <Link href="#">Aviso de Privacidade</Link>
          {/* <Link href="/terms-of-service">Termos de Serviço</Link> */}
          <Link href="#">Termos de Serviço</Link>
          {/* <Link href="/about">Sobre</Link> */}
          <Link href="#">Sobre</Link>
          {/* <Link href="/contact">Contato</Link> */}
          <Link href="#">Contato</Link>
          {!isAuthenticated ? (
            <Button type="submit" className="h-11" asChild>
              <Link href="/signin">Entrar</Link>
            </Button>
          ) : (
            <UserNav />
          )}
        </div>
      </div>
    </div>
  )
}
