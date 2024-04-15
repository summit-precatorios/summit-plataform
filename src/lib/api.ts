// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function api(resource?: string, init?: RequestInit): Promise<any> {
  const URL = `http://localhost:4004/auth/${resource}`
  const HTTP_TIMEOUT = 5000

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT)

  try {
    return await fetch(URL, {
      ...init,
      signal: controller.signal,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then(async (result: any) => result)
  } catch (error) {
  } finally {
    clearTimeout(timeoutId)
  }
}
