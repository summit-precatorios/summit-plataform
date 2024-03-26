import Image from 'next/image'

export function NavBar() {
  return (
    <>
      <div className="flex w-full mt-2 sm:text-center">
        <Image
          src="/large-summit-logo.svg"
          alt="summi-logo"
          width={150}
          height={75}
        />
      </div>
    </>
  )
}
