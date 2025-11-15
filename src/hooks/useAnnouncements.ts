import { getAllAnnouncements } from '@/services/announcement.service'
import { getAnnouncementsByUserDocument } from '@/services/user.service'
import { Announcement, Role, User } from '@/types'
import { useEffect, useState } from 'react'

export function useAnnouncements(
  user: User | null,
  isAllowedTo: (permission: string) => Promise<boolean>,
) {
  const [orders, dispatchOrders] = useState<Announcement[]>([])
  const [loading, dispatchLoading] = useState<boolean>(false)
  const [error, dispatchError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchOrders() {
      if (!user) return

      dispatchLoading(true)
      dispatchError(null)

      try {
        const response = (await isAllowedTo(Role.Admin))
          ? await getAllAnnouncements()
          : await getAnnouncementsByUserDocument(user.document)

        if (isMounted) dispatchOrders(response || [])
      } catch (error) {
        if (isMounted) dispatchError('error_fetching_orders')
      } finally {
        if (isMounted) dispatchLoading(false)
      }
    }

    if (user) fetchOrders()

    return () => {
      isMounted = false
    }
  }, [user, isAllowedTo])

  return { orders, loading, error }
}
