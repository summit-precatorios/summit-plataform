import { Button } from '@/components/ui/button'
import { activeAccount } from '@/services/auth'
import { ActiveAccountRequestData } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export function ActiveAccount({
  params,
}: {
  params: { token: string | string[] }
}) {
  useEffect(() => {
    onInit()
  })

  async function onInit() {
    const data: ActiveAccountRequestData = {
      token: params.token,
    }

    const response = await activeAccount(data)

    if (!response)
      throw new Error(
        'Ocorreu um erro na ativação da sua conta! Por favor tente mais tarde',
      )

    if (response.StatusCode === 400)
      throw new Error(
        'Ocorreu um erro na ativação da sua conta! Por favor tente mais tarde',
      )
  }

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
