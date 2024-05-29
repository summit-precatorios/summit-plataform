'use client'

import { ActiveAccount } from '@/app/(auth)/_components/active-account'
import { useParams } from 'next/navigation'

export default function ActivationAccount() {
  const params = useParams()
  const { token } = params

  return <ActiveAccount params={{ token }} />
}
