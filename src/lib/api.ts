import Cookies from 'js-cookie'

export const providerBaseHeaders = () => {
  const token = Cookies.get('summit.token')

  if (!token) throw new Error('token_is_missing')

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function api<ResponseType = any>(
  resource?: string,
  options: RequestInit = {},
) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}${resource}`

  try {
    const result = await fetch(BASE_URL, {
      ...options,
      signal: AbortSignal.timeout(1 * 10 * 1000), // 10 seconds
    })

    return (await result.json()) as ResponseType
  } catch (error) {}
}
