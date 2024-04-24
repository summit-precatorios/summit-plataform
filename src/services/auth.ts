import { api } from '@/lib/api'

type SignInRequestData = {
  document: string
  password: string
}

type RegisterRequestData = {
  document: string
  email: string
  fullName: string
  password: string
}

export async function signInRequest({ document, password }: SignInRequestData) {
  try {
    return await api('signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({ document, password }, null, 2),
    })
  } catch (error) {}
}

export async function registerRequest(data: RegisterRequestData) {
  try {
    return await api('register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data, null, 2),
    })
  } catch (error) {}
}
