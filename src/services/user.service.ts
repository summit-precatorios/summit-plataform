import { api } from '@/lib/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export async function getCurrentUser(token?: string) {
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenDecoded: any = await jwtDecode(token as string)

    return tokenDecoded.payload.document ?? undefined
  }
}

export async function getAnnouncementsByUserDocument(document: string) {
  const cookieStore = cookies()
  const token = cookieStore.get('summit.token')

  try {
    return await api(`user/announcements/${document}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
  } catch (error) {}
}
