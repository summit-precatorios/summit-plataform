import PermissionContext from '@/contexts/PermissionContext'
import { Permission } from '@/types'
import { ReactNode, useContext } from 'react'

type Props = {
  to: Permission
  children: ReactNode
}

export async function Restricted({ to, children }: Props) {
  const { isAllowedTo } = useContext(PermissionContext)

  if (await isAllowedTo(to)) return <>{children}</>

  return null
}

export default Restricted
