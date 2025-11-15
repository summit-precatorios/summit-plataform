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
  if (!resource) {
    throw new Error('API resource is required')
  }

  // Ensure resource starts with / and BASE_URL doesn't end with /
  const cleanBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || ''
  const cleanResource = resource.startsWith('/') ? resource : `/${resource}`
  const BASE_URL = `${cleanBaseUrl}${cleanResource}`

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined')
  }

  try {
    const result = await fetch(BASE_URL, {
      ...options,
      signal: AbortSignal.timeout(1 * 10 * 1000), // 10 seconds
    })

    if (!result.ok) {
      const errorData = await result.json().catch(() => ({
        message: `HTTP error! status: ${result.status}`,
        statusCode: result.status,
      }))
      // Preserva o statusCode no erro para tratamento adequado
      const error: Error & { statusCode?: number } = new Error(
        errorData.message || `HTTP error! status: ${result.status}`,
      )
      error.statusCode = result.status || errorData.statusCode
      throw error
    }

    return (await result.json()) as ResponseType
  } catch (error) {
    console.error('api_request_error', {
      url: BASE_URL,
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode:
        error && typeof error === 'object' && 'statusCode' in error
          ? (error as { statusCode: number }).statusCode
          : undefined,
    })
    throw error
  }
}
