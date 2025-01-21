import { api } from '@/lib/api'
import { CreateAnnouncementRequestData } from '@/types'
import Cookies from 'js-cookie'

export async function createAnnouncementRequest(
  data: CreateAnnouncementRequestData,
) {
  const token = Cookies.get('summit.token')

  try {
    return await api('announcement', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(data, null, 2),
    })
  } catch (error) {}
}

export async function getAnnouncementsByDocument(document: string) {
  const token = Cookies.get('summit.token')

  try {
    return await api(`user/announcements/${document}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
