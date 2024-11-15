import PermissionContext from '@/contexts/PermissionContext'
import { Permission } from '@/types'
import React, { ReactNode } from 'react'

type Props = {
  fetchPermission: (permission: Permission) => Promise<boolean>
  children: ReactNode
}

type PermissionCache = {
  [key: string]: boolean
}

export function PermissionProvider({ children, fetchPermission }: Props) {
  const cache: PermissionCache = {}

  const isAllowedTo = async (permission: Permission): Promise<boolean> => {
    if (Object.keys(cache).includes(permission)) return cache[permission]

    const isAllowed = await fetchPermission(permission)
    cache[permission] = isAllowed

    return isAllowed
  }

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  )
}
