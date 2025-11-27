'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UserNav } from '@/components/user-nav'
import { AuthContext } from '@/contexts/AuthContext'
import {
  Bell,
  HelpCircle,
  Info,
  LayoutDashboard,
  Mail,
  Menu,
  Shield,
  UserPlus,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useState } from 'react'

export function Header() {
  const { isAuthenticated, user } = useContext(AuthContext)
  const pathname = usePathname()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleLinkClick = () => {
    setIsSheetOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src="/logo.svg"
                        width={80}
                        height={80}
                        alt="Summit logo"
                        className="h-20 w-20 object-contain"
                        priority
                        quality={100}
                      />
                    </Link>
                  </SheetClose>

                  <nav className="flex flex-col gap-2">
                    {isAuthenticated && (
                      <SheetClose asChild>
                        <Link
                          href="/dashboard"
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                            isActive('/dashboard')
                              ? 'bg-[#EAAC2E]/10 text-[#EAAC2E]'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={handleLinkClick}
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Dashboard
                        </Link>
                      </SheetClose>
                    )}

                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        <Info className="h-5 w-5" />
                        Sobre
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        <Mail className="h-5 w-5" />
                        Contato
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/faq"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        <HelpCircle className="h-5 w-5" />
                        FAQ
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/privacy"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        <Shield className="h-5 w-5" />
                        Privacidade
                      </Link>
                    </SheetClose>

                    <div className="border-t pt-4 mt-2">
                      {!isAuthenticated ? (
                        <div className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Button asChild className="w-full">
                              <Link
                                href="/sign-in"
                                className="gap-2"
                                onClick={handleLinkClick}
                              >
                                Entrar
                              </Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full"
                            >
                              <Link
                                href="/register"
                                className="gap-2"
                                onClick={handleLinkClick}
                              >
                                <UserPlus className="h-4 w-4" />
                                Criar conta
                              </Link>
                            </Button>
                          </SheetClose>
                        </div>
                      ) : (
                        <div className="px-4">
                          <UserNav />
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.svg"
                width={80}
                height={80}
                alt="Summit logo"
                className="h-20 w-20 object-contain"
                priority
                quality={100}
              />
            </Link>

            {/* Desktop Navigation - Authenticated */}
            {isAuthenticated && (
              <nav className="hidden lg:flex items-center gap-1 ml-6">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-[#EAAC2E]/10 text-[#EAAC2E]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </nav>
            )}
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive('/about')
                  ? 'bg-[#EAAC2E]/10 text-[#EAAC2E]'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Sobre
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive('/contact')
                  ? 'bg-[#EAAC2E]/10 text-[#EAAC2E]'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Contato
            </Link>
            <Link
              href="/faq"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive('/faq')
                  ? 'bg-[#EAAC2E]/10 text-[#EAAC2E]'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              FAQ
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Entrar</Link>
                </Button>
                <Button
                  className="bg-[#EAAC2E] hover:bg-[#EAAC2E]/90 text-white"
                  asChild
                >
                  <Link href="/register" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Criar conta
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="h-5 w-5" />
                  {!user?.isActive && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                  )}
                  <span className="sr-only">Notificações</span>
                </Button>
                <UserNav />
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
