import { api, providerBaseHeaders } from '@/lib/api'
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
  try {
    const response = await api(`user/announcement/${document}`, {
      method: 'GET',
      headers: providerBaseHeaders(),
    })

    return response
  } catch (error) {
    console.error('fetch_error', {
      message: 'failed to fetch announcements by user document.',
      cause: error,
    })

    throw error
  }
}

export async function getAllAnnouncements() {
  try {
    const response = await api('announcement', {
      method: 'GET',
      headers: providerBaseHeaders(),
    })

    return response
  } catch (error) {
    console.error('fetch_error', {
      message: 'failed to fetch all announcements.',
      cause: error,
    })
    throw error
  }
}
