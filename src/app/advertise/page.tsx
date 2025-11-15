'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { useState } from 'react'
import { RegisterForm } from './_components/register-form'

type AnnouncementType = {
  label: 'RPV' | 'PRECATORIO'
  isActive: boolean
  description: string
}

export default function AdvertisePage() {
  const [announcementType, setAnnouncementType] = useState<AnnouncementType>({
    description: '',
    isActive: false,
    label: 'PRECATORIO',
  })

  const announcementTypes = [
    {
      label: 'RPV' as const,
      title: 'RPV - Requisição de Pequeno Valor',
      description: 'Valores de até 30 salários mínimos',
      icon: FileText,
      benefits: [
        'Processo mais rápido e ágil',
        'Desconto menor aplicado',
        'Liquidação em menor tempo',
      ],
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'PRECATORIO' as const,
      title: 'Precatório',
      description: 'Valores acima de 30 salários mínimos',
      icon: TrendingUp,
      benefits: [
        'Maior valor de negociação',
        'Processo mais seguro',
        'Melhor retorno financeiro',
      ],
      color: 'from-[#EAAC2E] to-[#ffc947]',
      borderColor: 'border-[#EAAC2E]/30',
      bgColor: 'bg-[#EAAC2E]/5',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Anuncie seu {announcementType.isActive ? announcementTypes.find(t => t.label === announcementType.label)?.title.split(' - ')[0] || 'Precatório' : 'Precatório'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {announcementType.isActive
              ? `Preencha as informações abaixo para anunciar seu ${announcementTypes.find(t => t.label === announcementType.label)?.title.split(' - ')[0] || 'precatório'}.`
              : 'Escolha o tipo de precatório que deseja anunciar e comece a negociar hoje mesmo.'}
          </p>
        </div>

        {/* Selection Cards */}
        {!announcementType.isActive && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-12">
            {announcementTypes.map((type) => {
              const Icon = type.icon
              const isSelected = announcementType.label === type.label

              return (
                <Card
                  key={type.label}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    isSelected
                      ? `${type.bgColor} ${type.borderColor} border-2 shadow-lg`
                      : 'border-2 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setAnnouncementType({
                      description: type.description,
                      isActive: true,
                      label: type.label,
                    })
                    // Scroll suave para o formulário
                    setTimeout(() => {
                      const formElement = document.getElementById('announcement-form')
                      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 100)
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-3 rounded-lg ${
                          isSelected
                            ? `bg-gradient-to-r ${type.color} text-white`
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">{type.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mt-4">
                      {type.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Info Banner */}
        {announcementType.isActive && (
          <Card className={`mb-8 border-2 ${announcementTypes.find(t => t.label === announcementType.label)?.borderColor || 'border-blue-200'} ${announcementTypes.find(t => t.label === announcementType.label)?.bgColor || 'bg-blue-50'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Informações importantes
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Todos os campos são obrigatórios para garantir a segurança da transação</li>
                    <li>• O valor líquido é calculado automaticamente (95% do valor de venda)</li>
                    <li>• Você receberá um e-mail de confirmação após o registro</li>
                    <li>• Seus dados estão protegidos e seguros</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Section */}
        <div id="announcement-form">
          <RegisterForm
            announcementType={announcementType.label}
            title={
              announcementType.label === 'RPV'
                ? 'RPV'
                : 'Precatório'
            }
            description={
              announcementType.isActive
                ? `Preencha todas as informações para anunciar seu ${announcementType.label === 'RPV' ? 'RPV' : 'precatório'}`
                : ''
            }
            show={announcementType.isActive}
          />
        </div>

        {/* Back Button */}
        {announcementType.isActive && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setAnnouncementType({
                  description: '',
                  isActive: false,
                  label: 'PRECATORIO',
                })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              ← Voltar para seleção de tipo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
