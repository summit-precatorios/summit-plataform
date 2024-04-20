'use client'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  return (
    <>
      <div className="container grid grid-cols-2 mt-4">
        <div className="flex justify-center">
          <h1>Documents</h1>
        </div>
        <div className="flex justify-center">
          <h1>Form</h1>
        </div>
      </div>
    </>
  )
}
