'use client'

import { LoadingSpinner } from '@/components/loading-spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { handleApiError } from '@/lib/error-handler'
import { getAnnouncementsByDocument } from '@/services/announcement.service'
import { Announcement } from '@/types'
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  Landmark,
  Scale,
  Share2,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AnnouncementDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnnouncement() {
      const id = params?.id as string

      if (!id) {
        setError('ID do anúncio não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await getAnnouncementsByDocument(id)

        if (response && response.id) {
          setAnnouncement(response)
        } else {
          setError('Anúncio não encontrado')
        }
      } catch (err) {
        const errorToast = handleApiError(
          err && typeof err === 'object' && 'statusCode' in err
            ? (err as { statusCode?: number; message?: string })
            : err,
        )
        toast(errorToast)
        setError('Não foi possível carregar o anúncio')
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncement()
  }, [params?.id, toast])

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getCourtName = (court: string) => {
    const courts: Record<string, string> = {
      federal: 'TRF-1',
      estadual: 'TRF-4',
      municipal: 'TJSP',
    }
    return courts[court] || court
  }

  const getOriginName = (origin: string) => {
    const origins: Record<string, string> = {
      federal: 'Federal',
      estadual: 'Estadual',
      municipal: 'Municipal',
    }
    return origins[origin] || origin
  }

  const getTypeName = (type: string) => {
    return type === 'RPV' ? 'RPV - Requisição de Pequeno Valor' : 'Precatório'
  }

  const getStatusBadge = (status: string) => {
    if (status === 'APPROVED') {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Aprovado
        </Badge>
      )
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        <Clock className="mr-1 h-3 w-3" />
        Aguardando Aprovação
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <p className="text-sm text-gray-600">Carregando anúncio...</p>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Anúncio não encontrado
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {error ||
                    'O anúncio solicitado não foi encontrado ou não existe mais.'}
                </p>
              </div>
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Detalhes do Anúncio
                </h1>
                {getStatusBadge(announcement.status || 'PENDING')}
              </div>
              <p className="text-lg text-gray-600">
                {getTypeName(announcement.type)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ID: {announcement.id} • Criado em{' '}
                {announcement.createdAt
                  ? formatDate(announcement.createdAt)
                  : 'Data não disponível'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados do Proprietário */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Dados do Proprietário
                    </CardTitle>
                    <CardDescription>
                      Informações sobre o proprietário do precatório
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Nome Completo
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {announcement.ownerFullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      CPF
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {announcement.ownerDocument}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Processo */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Informações do{' '}
                      {announcement.type === 'RPV' ? 'RPV' : 'Precatório'}
                    </CardTitle>
                    <CardDescription>
                      Detalhes sobre o processo judicial
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Número do Processo
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900 font-mono">
                      {announcement.lawSuit}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Origem
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {getOriginName(announcement.origin)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Tribunal
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-gray-400" />
                      <p className="text-base font-semibold text-gray-900">
                        {getCourtName(announcement.court)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valores */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Banknote className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Valores</CardTitle>
                    <CardDescription>
                      Informações financeiras do anúncio
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Valor Nominal
                    </label>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(announcement.price)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Valor original do título
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Valor de Venda
                    </label>
                    <div className="flex items-baseline gap-2">
                      <TrendingUp className="h-5 w-5 text-[#EAAC2E]" />
                      <p className="text-2xl font-bold text-[#EAAC2E]">
                        {formatCurrency(announcement.salePrice)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Valor oferecido para venda
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Saldo Líquido
                    </label>
                    <div className="flex items-baseline gap-2">
                      <Wallet className="h-5 w-5 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(announcement.liquidBalance)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">Após taxa de 5%</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Informação sobre os valores
                      </p>
                      <p className="text-sm text-blue-800">
                        O saldo líquido é calculado automaticamente como 95% do
                        valor de venda, descontando a taxa de manutenção de 5%
                        da plataforma.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados para Recebimento */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EAAC2E]/10">
                    <CreditCard className="h-5 w-5 text-[#EAAC2E]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Dados para Recebimento
                    </CardTitle>
                    <CardDescription>
                      Informações sobre como será realizado o pagamento
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Método de Pagamento
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    {announcement.paymentOption === 'PIX' ? (
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 border border-blue-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#37c6d0"
                            d="M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475	l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z"
                          />
                        </svg>
                        <span className="font-semibold text-blue-900">PIX</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 border border-green-200">
                        <Landmark className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-900">
                          Transferência Bancária
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {announcement.paymentOption === 'PIX' ? (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Chave PIX
                    </label>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {announcement.pixKey || 'Não informado'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Titular da Conta
                      </label>
                      <p className="mt-1 text-base font-semibold text-gray-900">
                        {announcement.ownerBankAccount || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        CPF/CNPJ
                      </label>
                      <p className="mt-1 text-base font-semibold text-gray-900">
                        {announcement.documentBankAccount || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Conta
                      </label>
                      <p className="mt-1 text-base font-semibold text-gray-900">
                        {announcement.bankAccount || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Agência
                      </label>
                      <p className="mt-1 text-base font-semibold text-gray-900">
                        {announcement.agencyBankAccount || 'Não informado'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#EAAC2E] hover:bg-[#ffc947]">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Anúncio
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Detalhes
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/dashboard')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Status do Anúncio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getStatusBadge(announcement.status || 'PENDING')}
                  <div className="pt-4 border-t">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Criado em</span>
                        <span className="font-medium text-gray-900">
                          {announcement.createdAt
                            ? new Date(
                                announcement.createdAt,
                              ).toLocaleDateString('pt-BR')
                            : 'Data não disponível'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tipo</span>
                        <span className="font-medium text-gray-900">
                          {announcement.type === 'RPV' ? 'RPV' : 'Precatório'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="border-2 border-[#EAAC2E] bg-[#EAAC2E]/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="h-5 w-5 text-[#EAAC2E]" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Valor de Venda
                    </span>
                    <span className="text-lg font-bold text-[#EAAC2E]">
                      {formatCurrency(announcement.salePrice)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Taxa (5%)</span>
                    <span className="text-sm font-medium text-gray-700">
                      {formatCurrency(
                        parseFloat(announcement.salePrice) -
                          parseFloat(announcement.liquidBalance)
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-semibold text-gray-900">
                      Saldo Líquido
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(announcement.liquidBalance)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
