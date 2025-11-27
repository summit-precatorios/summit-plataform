import { Button } from '@/components/ui/button'
import { activeAccount } from '@/services/auth.service'
import { ActiveAccountRequestData } from '@/types'
import { TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ActiveAccount({
  params,
}: {
  params: { token: string | string[] }
}) {
  const [accountActivated, setAccountActivated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onPageInit = async () => {
      try {
        // Verifica se o token é uma string válida
        const token = Array.isArray(params.token)
          ? params.token[0]
          : params.token
        if (!token) {
          throw new Error('Token inválido ou ausente.')
        }

        const data: ActiveAccountRequestData = { token }
        const response = await activeAccount(data)

        if (!response || response.statusCode === 401) {
          throw new Error(
            'O token de ativação é inválido ou expirado. Solicite um novo link de ativação.',
          )
        }

        if (!response || response.statusCode === 400) {
          throw new Error(
            'Ocorreu um erro na ativação da sua conta! Por favor, tente mais tarde.',
          )
        }

        // Ativação bem-sucedida
        setAccountActivated(true)

        // Redireciona para a página de login após a ativação
        // router.push('/sign-in')
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        )
      } finally {
        setIsLoading(false) // Finaliza o estado de carregamento
      }
    }

    onPageInit()
  }, [params.token])

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4" />
        <p className="text-lg">Ativando sua conta...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <TriangleAlert className="mb-10" />
        <h1 className="text-2xl font-medium  text-wrap text-center ">
          {error}
        </h1>
        <Button asChild className="mt-10 py-6 px-8">
          <Link href="/sign-in">Voltar para o login</Link>
        </Button>
      </div>
    )
  }

  if (accountActivated) {
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
          <Link href="/sign-in">Acessar minha conta</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-medium w-96 text-wrap text-center">
        Ocorreu um erro inesperado. Tente novamente mais tarde.
      </h1>
      <Button asChild className="mt-10 py-6 px-8">
        <Link href="/sign-in">Voltar para o login</Link>
      </Button>
    </div>
  )
}
