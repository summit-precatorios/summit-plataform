import Link from 'next/link'

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-semibold">Summit Precatórios</div>

        <Link
          className="text-[#facc15] font-semibold transition-all  hover:text-black"
          href="/privacy"
        >
          Aviso de Privacidade
        </Link>
        <Link
          className="text-[#facc15] font-semibold transition-all  hover:text-black"
          href="/terms-of-service"
        >
          Termos de Serviço
        </Link>
        <Link
          className="text-[#facc15] font-semibold transition-all  hover:text-black"
          href="/about"
        >
          Sobre
        </Link>
      </div>
    </div>
  )
}
