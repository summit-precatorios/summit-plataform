import { api } from '@/lib/api'
import {
  ForgotPasswordRequestData,
  RegisterRequestData,
  SignInRequestData,
} from '@/types'

export async function signInRequest({ document, password }: SignInRequestData) {
  try {
    return await api('auth/signin', {
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
    return await api('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data, null, 2),
    })
  } catch (error) {}
}

export async function forgotPassword(data: ForgotPasswordRequestData) {
  try {
    return await api('auth/recovery/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.API_KEY}`,
      },
      body: JSON.stringify(data, null, 2),
    })
  } catch (error) {}
}
