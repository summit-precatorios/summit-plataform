import { HttpError } from '@/exceptions/http-error.exceptions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function api<ResponseType = any>(
  resource?: string,
  options: RequestInit = {},
) {
  const BASE_URL = `https://summitprecatorios.com.br/api/auth/${resource}`
  // const BASE_URL = `http://localhost:4004/api/auth/${resource}`

  try {
    const result = await fetch(BASE_URL, {
      ...options,
      signal: AbortSignal.timeout(3000),
    })
    if (!result.ok) {
      return new HttpError(result)
    }
    return (await result.json()) as ResponseType
  } catch (error) {}
}
