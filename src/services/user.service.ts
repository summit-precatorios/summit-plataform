import { jwtDecode } from 'jwt-decode'

export async function getCurrentUser(token?: string) {
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenDecoded: any = await jwtDecode(token as string)

    return tokenDecoded.payload.document ?? undefined
  }
}
