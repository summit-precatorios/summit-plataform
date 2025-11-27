'use client'

import PermissionContext from '@/contexts/PermissionContext'
import { Permission } from '@/types'
import { useContext, useEffect, useState } from 'react'

const usePermission = (permission: Permission | Permission[]) => {
  const [allowed, setAllowed] = useState<boolean>()
  const { isAllowedTo } = useContext(PermissionContext)

  useEffect(() => {
    const checkPermissions = async () => {
      if (Array.isArray(permission)) {
        const results = await Promise.all(permission.map((p) => isAllowedTo(p)))
        setAllowed(results.some((result) => result))
      } else {
        const result = await isAllowedTo(permission)
        setAllowed(result)
      }
    }

    checkPermissions()
  }, [isAllowedTo, permission])

  return { allowed }
}

export default usePermission
