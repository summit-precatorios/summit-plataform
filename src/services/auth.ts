import { api } from '@/lib/api'

type SignInRequestData = {
  document: string
  password: string
}

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await api('signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data, null, 2),
    })

    const { accessToken } = await response.json()

    return accessToken
    // if (!accessToken) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Falha de Autenticação',
    //     description: 'Credenciais de acesso inválidas ou não registradas',
    //   })
    // }
  } catch (error) {
    // toast({
    //   variant: 'destructive',
    //   title: 'Erro interno',
    //   description: 'Não foi possível processar a sua requisição',
    // })
  }
}
