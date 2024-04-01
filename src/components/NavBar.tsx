import Image from 'next/image'
import Link from 'next/link'

export function NavBar() {
  return (
    <>
      <div className="flex w-full mt-2 sm:text-center justify-evenly items-center pr-3 md:flex p-2">
        <Link href={'/'}>
          <Image
            src="/large-summit-logo.svg"
            alt="summi-logo"
            width={150}
            height={75}
          />
        </Link>

        <div className="w-56 h- text-center bg-red-400 p-3 rounded text-white">
          Ambiente de Homologação
        </div>
      </div>
    </>
  )
}
