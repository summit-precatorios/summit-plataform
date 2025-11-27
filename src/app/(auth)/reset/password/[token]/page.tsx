'use client'

import { useParams } from 'next/navigation'
import { ResetPasswordForm } from '../../../_components/reset-password-form'

export default function ResetPassword() {
  const params = useParams()
  const { token } = params

  return <ResetPasswordForm params={{ token }} />
}
