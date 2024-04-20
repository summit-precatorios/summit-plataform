// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function api(resource?: string, init?: RequestInit): Promise<any> {
  const URL = `https://summitprecatorios.com.br/api/auth/${resource}`
  const HTTP_TIMEOUT = 3000

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT)

  try {
    return await fetch(URL, {
      ...init,
      signal: controller.signal,
    })
  } catch (error) {
  } finally {
    clearTimeout(timeoutId)
  }
}
