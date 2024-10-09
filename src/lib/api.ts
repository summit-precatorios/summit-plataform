// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function api<ResponseType = any>(
  resource?: string,
  options: RequestInit = {},
) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}${resource}`

  try {
    const result = await fetch(BASE_URL, {
      ...options,
      signal: AbortSignal.timeout(1 * 60 * 1000), // 1 minute
    })

    return (await result.json()) as ResponseType
  } catch (error) {}
}
