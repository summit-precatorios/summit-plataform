import { api } from '@/lib/api'

type SignInRequestData = {
  document: string
  password: string
}

export async function signInRequest(data: SignInRequestData) {
  try {
    return await api('signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data, null, 2),
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(async (result: any) => await result.json())
      .then((response) => response)
  } catch (error) {}
}
