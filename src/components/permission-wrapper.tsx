'use client'

import { AuthContext } from '@/contexts/AuthContext'
import { PermissionProvider } from '@/providers/PermissionProvider'
import { Permission, User } from '@/types'
import { ReactNode, useContext } from 'react'

interface PermissionWrapperProps {
  children: ReactNode
}

export function PermissionWrapper({ children }: PermissionWrapperProps) {
  const { user } = useContext(AuthContext)

  const fetchPermission = (user: User) => async (permission: Permission) => {
    return user?.roles.includes(permission)
  }

  return (
    <PermissionProvider fetchPermission={fetchPermission(user!)}>
      {children}
    </PermissionProvider>
  )
}
