'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useContext, useState } from 'react'
import { RegisterForm } from './_components/register-form'
import { AuthContext } from '@/contexts/AuthContext'

type AnnouncementType = {
  label: 'RPV' | 'PRECATORIO'
  isActive: boolean
  description: string
}

const ProtectedResource = () => {
  const { user } = useContext(AuthContext)

  if (!user || !user.roles.includes('commom-user')) {
    return <div>É necessário ter a conta ativada para poder anunciar.</div>
  }

  return <div>Bem-vindo ao recurso protegido!</div>
}

export default function Page() {
  const [announcementType, setAnnouncementType] = useState<AnnouncementType>({
    description: '',
    isActive: false,
    label: 'PRECATORIO',
  })

  return (
    <div className="flex flex-col justify-start max-w-7xl mx-auto mt-20 max-sm:p-4 max-sm:justify-start max-md:p-4 max-md:justify-start">
      <h1 className="text-3xl font-semibold mb-4">
        Olá, o que você quer anunciar?
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-3">
        <Card
          className={`cursor-pointer ${announcementType.label === 'RPV' ? 'bg-gray-100' : ''}`}
          onClick={() => {
            setAnnouncementType({
              description: 'Descrição sobre RPV',
              isActive: true,
              label: 'RPV',
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">RPV</div>
            <p className="text-xs text-muted-foreground">
              Até 30 salários mínimos
            </p>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer ${announcementType.label === 'PRECATORIO' ? 'bg-gray-100' : ''}`}
          onClick={() => {
            setAnnouncementType({
              description: 'Descrição sobre Precatório',
              isActive: true,
              label: 'PRECATORIO',
            })
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">Precatório</div>
            <p className="text-xs text-muted-foreground">
              +30 salários mínimos
            </p>
          </CardContent>
        </Card>
      </div>

      <RegisterForm
        announcementType={announcementType.label}
        title={announcementType.label === 'RPV' ? 'RPV' : 'Precatório'}
        description={announcementType.description}
        show={announcementType.isActive}
      />
    </div>
  )
}
