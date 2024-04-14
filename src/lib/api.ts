// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function api(url: string, init?: RequestInit): Promise<any> {
  const URL_BASE = process.env.API_URL
  const HTTP_TIMEOUT = 5000

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT)

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((result: any) => result)
  } catch (error) {
  } finally {
    clearTimeout(timeoutId)
  }
}
