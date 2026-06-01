'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/error-handler';
import { getAnnouncementsByDocument } from '@/services/announcement.service';
import { Announcement } from '@/types';
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CheckCircle2,
  ChevronRight,
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
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AnnouncementDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      const id = params?.id as string;

      if (!id) {
        setError('ID do anúncio não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getAnnouncementsByDocument(id);
        if (response && response.id) {
          setAnnouncement(response);
        } else {
          setError('Anúncio não encontrado');
        }
      } catch (err) {
        const errorToast = handleApiError(
          err && typeof err === 'object' && 'statusCode' in err
            ? (err as { statusCode?: number; message?: string })
            : err
        );
        toast(errorToast);
        setError('Não foi possível carregar o anúncio');
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncement();
  }, [params?.id, toast]);

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue);
  };

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));

  const getCourtName = (court: string) =>
    ({ federal: 'TRF-1', estadual: 'TRF-4', municipal: 'TJSP' })[court] ?? court;

  const getOriginName = (origin: string) =>
    ({ federal: 'Federal', estadual: 'Estadual', municipal: 'Municipal' })[origin] ?? origin;

  const getStatusBadge = (status: string) => {
    if (status === 'APROVED')
      return (
        <Badge className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'>
          <CheckCircle2 className='mr-1 h-3 w-3' />
          Aprovado
        </Badge>
      );
    if (status === 'REPROVED')
      return (
        <Badge className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'>
          <AlertCircle className='mr-1 h-3 w-3' />
          Reprovado
        </Badge>
      );
    return (
      <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200'>
        <Clock className='mr-1 h-3 w-3' />
        Aguardando Aprovação
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50/50'>
        <div className='flex flex-col items-center gap-3'>
          <LoadingSpinner />
          <p className='text-sm text-gray-500'>Carregando anúncio...</p>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50/50'>
        <Card className='max-w-sm shadow-md'>
          <CardContent className='pt-8 pb-6 px-6'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <div className='rounded-full bg-gray-100 p-4'>
                <AlertCircle className='h-8 w-8 text-gray-400' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Anúncio não encontrado</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {error || 'O anúncio solicitado não existe ou foi removido.'}
                </p>
              </div>
              <Button onClick={() => router.push('/announcement')} variant='outline' className='mt-2'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Ver todos os anúncios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const platformFee = parseFloat(announcement.salePrice) - parseFloat(announcement.liquidBalance);
  const isRPV = announcement.type === 'RPV';

  return (
    <div className='min-h-screen bg-gray-50/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6'>

        {/* Navigation */}
        <div className='space-y-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.back()}
            className='text-gray-500 hover:text-gray-900 -ml-2'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
          <nav className='flex items-center gap-1 text-sm text-gray-400'>
            <Link href='/' className='hover:text-gray-700 transition-colors'>Início</Link>
            <ChevronRight className='h-3.5 w-3.5' />
            <Link href='/announcement' className='hover:text-gray-700 transition-colors'>Anúncios</Link>
            <ChevronRight className='h-3.5 w-3.5' />
            <span className='text-gray-700 font-medium'>Detalhes</span>
          </nav>
        </div>

        {/* Hero Card */}
        <Card className='border-0 shadow-md overflow-hidden'>
          <div className='h-1.5 bg-gradient-to-r from-brand to-brand-gold' />
          <CardContent className='p-6 sm:p-8'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>

              {/* Left: Identity */}
              <div className='flex-1 min-w-0'>
                <div className='flex flex-wrap items-center gap-2 mb-4'>
                  <Badge className='bg-brand-dark text-white hover:bg-brand-dark text-xs px-2.5 py-0.5'>
                    {isRPV ? 'RPV' : 'Precatório'}
                  </Badge>
                  {getStatusBadge(announcement.status ?? 'PENDENT')}
                </div>

                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
                  {isRPV ? 'RPV — Requisição de Pequeno Valor' : 'Precatório'}{' '}
                  <span className='text-brand'>{getOriginName(announcement.origin)}</span>
                </h1>

                <div className='mt-4 space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <FileText className='h-4 w-4 flex-shrink-0 text-gray-400' />
                    <span className='font-mono text-xs sm:text-sm truncate'>{announcement.lawSuit}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <Landmark className='h-4 w-4 flex-shrink-0 text-gray-400' />
                    <span>{getCourtName(announcement.court)}</span>
                  </div>
                  {announcement.createdAt && (
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <Clock className='h-3.5 w-3.5 flex-shrink-0' />
                      <span>Publicado em {formatDate(announcement.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider (desktop) */}
              <div className='hidden lg:block w-px bg-gray-100 self-stretch' />

              {/* Right: Financial metrics */}
              <div className='flex flex-row lg:flex-col sm:gap-4 lg:gap-0 lg:w-60 rounded-xl border border-gray-100 overflow-hidden divide-x sm:divide-x-0 lg:divide-y lg:divide-x-0'>
                <div className='flex-1 p-4 space-y-1'>
                  <div className='flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide'>
                    <Banknote className='h-3 w-3' />
                    Valor Nominal
                  </div>
                  <p className='text-lg sm:text-xl font-bold text-gray-800 tabular-nums'>
                    {formatCurrency(announcement.price)}
                  </p>
                </div>

                <div className='flex-1 p-4 space-y-1 bg-brand/5'>
                  <div className='flex items-center gap-1.5 text-xs font-medium text-brand uppercase tracking-wide'>
                    <TrendingUp className='h-3 w-3' />
                    Valor de Venda
                  </div>
                  <p className='text-xl sm:text-2xl font-bold text-brand tabular-nums'>
                    {formatCurrency(announcement.salePrice)}
                  </p>
                </div>

                <div className='flex-1 p-4 space-y-1'>
                  <div className='flex items-center gap-1.5 text-xs font-medium text-blue-500 uppercase tracking-wide'>
                    <Wallet className='h-3 w-3' />
                    Saldo Líquido
                  </div>
                  <p className='text-lg sm:text-xl font-bold text-blue-700 tabular-nums'>
                    {formatCurrency(announcement.liquidBalance)}
                  </p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className='grid gap-6 lg:grid-cols-3'>

          {/* Left Column */}
          <div className='lg:col-span-2 space-y-6'>

            {/* Process Info */}
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-purple-50'>
                    <FileText className='h-4 w-4 text-purple-600' />
                  </div>
                  <CardTitle className='text-base font-semibold'>
                    Informações do {isRPV ? 'RPV' : 'Precatório'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid gap-y-5 gap-x-8 sm:grid-cols-2'>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Número do Processo</p>
                    <p className='text-sm font-semibold text-gray-900 font-mono'>{announcement.lawSuit}</p>
                  </div>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Origem</p>
                    <p className='text-sm font-semibold text-gray-900'>{getOriginName(announcement.origin)}</p>
                  </div>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Tribunal</p>
                    <div className='flex items-center gap-1.5'>
                      <Landmark className='h-3.5 w-3.5 text-gray-400' />
                      <p className='text-sm font-semibold text-gray-900'>{getCourtName(announcement.court)}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Tipo</p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {isRPV ? 'RPV — Requisição de Pequeno Valor' : 'Precatório'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-blue-50'>
                    <User className='h-4 w-4 text-blue-600' />
                  </div>
                  <CardTitle className='text-base font-semibold'>Dados do Proprietário</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid gap-y-5 gap-x-8 sm:grid-cols-2'>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Nome Completo</p>
                    <p className='text-sm font-semibold text-gray-900'>{announcement.ownerFullName}</p>
                  </div>
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>CPF</p>
                    <p className='text-sm font-semibold text-gray-900 font-mono'>{announcement.ownerDocument}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-brand/10'>
                    <CreditCard className='h-4 w-4 text-brand' />
                  </div>
                  <CardTitle className='text-base font-semibold'>Dados para Recebimento</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div>
                  <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-2'>Método de Pagamento</p>
                  {announcement.paymentOption === 'PIX' ? (
                    <div className='inline-flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 48 48'>
                        <path fill='#37c6d0' d='M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z' />
                      </svg>
                      <span className='text-sm font-semibold text-blue-900'>PIX</span>
                    </div>
                  ) : (
                    <div className='inline-flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-1.5'>
                      <Landmark className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-semibold text-green-900'>Transferência Bancária</span>
                    </div>
                  )}
                </div>

                {announcement.paymentOption === 'PIX' ? (
                  <div>
                    <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Chave PIX</p>
                    <p className='text-sm font-semibold text-gray-900'>{announcement.pixKey || 'Não informado'}</p>
                  </div>
                ) : (
                  <div className='grid gap-y-5 gap-x-8 sm:grid-cols-2'>
                    <div>
                      <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Titular da Conta</p>
                      <p className='text-sm font-semibold text-gray-900'>{announcement.ownerBankAccount || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>CPF/CNPJ</p>
                      <p className='text-sm font-semibold text-gray-900 font-mono'>{announcement.documentBankAccount || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Conta</p>
                      <p className='text-sm font-semibold text-gray-900 font-mono'>{announcement.bankAccount || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>Agência</p>
                      <p className='text-sm font-semibold text-gray-900 font-mono'>{announcement.agencyBankAccount || 'Não informado'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className='space-y-4 lg:sticky lg:top-8 lg:self-start'>

            {/* Summary + Actions */}
            <Card className='border-2 border-brand/20 shadow-md bg-white'>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <Scale className='h-4 w-4 text-brand' />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2.5'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500'>Valor de Venda</span>
                    <span className='font-semibold text-gray-900 tabular-nums'>
                      {formatCurrency(announcement.salePrice)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500'>Taxa da plataforma (5%)</span>
                    <span className='font-medium text-red-500 tabular-nums'>
                      − {formatCurrency(platformFee)}
                    </span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-semibold text-gray-900'>Saldo Líquido</span>
                    <span className='text-xl font-bold text-brand tabular-nums'>
                      {formatCurrency(announcement.liquidBalance)}
                    </span>
                  </div>
                </div>

                <div className='space-y-2 pt-2'>
                  <Button className='w-full bg-brand hover:bg-brand/90 text-white font-semibold'>
                    <Share2 className='mr-2 h-4 w-4' />
                    Compartilhar Anúncio
                  </Button>
                  <Button variant='outline' className='w-full'>
                    <Download className='mr-2 h-4 w-4' />
                    Baixar Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base font-semibold'>Status do Anúncio</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {getStatusBadge(announcement.status ?? 'PENDENT')}
                <div className='space-y-3 border-t pt-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500'>Criado em</span>
                    <span className='font-medium text-gray-900'>
                      {announcement.createdAt
                        ? new Date(announcement.createdAt).toLocaleDateString('pt-BR')
                        : '—'}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500'>Tipo</span>
                    <span className='font-medium text-gray-900'>
                      {isRPV ? 'RPV' : 'Precatório'}
                    </span>
                  </div>
                  <div className='flex items-start justify-between text-sm gap-2'>
                    <span className='text-gray-500 flex-shrink-0'>ID</span>
                    <span className='font-mono text-xs text-gray-500 text-right break-all'>
                      {announcement.id}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
