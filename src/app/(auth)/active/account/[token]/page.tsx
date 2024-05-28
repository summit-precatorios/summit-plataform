'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ActiveAccount() {
  const params = useParams()
  const { token } = params

  //   try {
  //     const response = await api('active/account', {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-api-key': `${process.env.API_KEY}`,
  //       },
  //       body: JSON.stringify(token, null, 2),
  //     })
  //   } catch (error) {}

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src="/check-in.png"
        alt="check-in"
        width="121"
        height="121"
        className="mb-10"
      />
      <h1 className="text-3xl font-medium w-96 text-wrap text-center">
        A sua conta foi ativada com sucesso!
      </h1>

      <Button asChild className="mt-10 py-6 px-8">
        <Link href="/signin">Acessar minha conta</Link>
      </Button>
    </div>
  )
}
