import PermissionContext from '@/contexts/PermissionContext'
import { Permission } from '@/types'
import { useContext, useState } from 'react'

const usePermission = (permission: Permission) => {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState<boolean>()

  const { isAllowedTo } = useContext(PermissionContext)

  isAllowedTo(permission).then((allowed) => {
    setLoading(false)
    setAllowed(allowed)
  })
  return [loading, allowed]
}

export default usePermission
