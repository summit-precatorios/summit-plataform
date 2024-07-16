'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import { RegisterForm } from './_components/register-form'

export default function Page() {
  const [activeForm, setActiveForm] = useState('')
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')

  return (
    <div className="flex flex-col justify-start max-w-7xl mx-auto mt-20 max-sm:p-4 max-sm:justify-start max-md:p-4 max-md:justify-start">
      <h1 className="text-3xl font-semibold mb-4">
        Olá, o que você quer anunciar?
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-3">
        <Card
          className={`cursor-pointer ${activeForm === 'RPV' ? 'bg-gray-100' : ''}`}
          onClick={() => {
            setActiveForm('RPV')
            setShow(true)
            setDescription('Descrição sobre RPV')
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
          className={`cursor-pointer ${activeForm === 'Precatório' ? 'bg-gray-100' : ''}`}
          onClick={() => {
            setActiveForm('Precatório')
            setShow(true)
            setDescription('Descrição sobre Precatório')
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

      <RegisterForm title={activeForm} description={description} show={show} />
    </div>
  )
}
