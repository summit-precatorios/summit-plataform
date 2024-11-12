import { api } from '@/lib/api'
import { CreateAnnouncementRequestData } from '@/types'

import { cookies } from 'next/headers'

export async function createAnnouncementRequest(
  data: CreateAnnouncementRequestData,
) {
  const cookieStore = cookies()
  const token = cookieStore.get('summit.token')

  try {
    console.log(token)
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
