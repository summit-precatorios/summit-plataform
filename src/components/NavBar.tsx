import Image from 'next/image'

export function NavBar() {
  return (
    <>
      <div className="flex w-full mt-2 sm:text-center justify-between items-center pr-3">
        <Image
          src="/large-summit-logo.svg"
          alt="summi-logo"
          width={150}
          height={75}
        />
        <div className="w-56 h- text-center bg-red-400 p-3 rounded text-white">
          Ambiente de Homologação
        </div>
      </div>
    </>
  )
}
