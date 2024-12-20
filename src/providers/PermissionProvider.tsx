'use client'

import { AuthContext } from '@/contexts/AuthContext'
import PermissionContext from '@/contexts/PermissionContext'
import { Permission } from '@/types'
import React, { ReactNode, useContext } from 'react'

type Props = {
  children: ReactNode
}

type PermissionCache = {
  [key: string]: boolean
}

export function PermissionProvider({ children }: Props) {
  const { user } = useContext(AuthContext)

  const cache: PermissionCache = {}

  const fetchPermission = async (permission: Permission) => {
    if (!user) return false

    return user.roles.includes(permission)
  }

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
