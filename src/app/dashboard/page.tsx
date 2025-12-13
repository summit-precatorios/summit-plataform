'use client';

import { columns } from '@/app/announcement/columns';
import { DataTable } from '@/app/announcement/data-table';
import { Sidebar } from '@/app/dashboard/_components/sidebar';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Restricted } from '@/components/restricted';
import { ToolTipHelper } from '@/components/tool-tip';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';
import PermissionContext from '@/contexts/PermissionContext';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { verifyAccountByDocument } from '@/services/auth.service';
import { Role } from '@/types';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    PlusCircle,
    TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { isAllowedTo } = useContext(PermissionContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('announcements');

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useAnnouncements(user, isAllowedTo);

  // Verifica se o erro é relacionado à falta de permissão/role
  const isPermissionError =
    ordersError?.type === 'FORBIDDEN' || ordersError?.type === 'UNAUTHORIZED';

  const { toast } = useToast();

  // Calcula estatísticas dos anúncios
  const statistics = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        total: 0,
        pending: 0,
        approved: 0,
        totalValue: 0,
      };
    }

    // Por enquanto, todos os anúncios são considerados pendentes
    // até que seja implementado o campo status no backend
    const total = orders.length;
    const pending = total; // Todos pendentes por enquanto
    const approved = 0; // Nenhum aprovado por enquanto

    const totalValue = orders.reduce((sum, order) => {
      const price = parseFloat(order.price?.toString() || '0');
      return sum + price;
    }, 0);

    return {
      total,
      pending,
      approved,
      totalValue,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    // Por enquanto, mostra todos os anúncios em ambos os tabs
    // até que o campo status seja implementado
    if (activeTab === 'announcements-approved') {
      return []; // Nenhum aprovado ainda
    }
    return orders;
  }, [orders, activeTab]);

  async function handleClick() {
    const document = user?.document;

    if (document) {
      setLoading(true);
      setError(null);

      try {
        const response = await verifyAccountByDocument({ document });

        if (response.success) {
          toast({
            variant: 'default',
            title: 'E-mail enviado!',
            description:
              'E-mail com as informações para ativação da conta foi enviado com sucesso!',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Erro ao enviar e-mail',
            description: 'Ocorreu um erro ao enviar o e-mail de ativação.',
          });
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Erro ao enviar e-mail',
          description: 'Ocorreu um erro ao enviar o e-mail de ativação.',
        });
      } finally {
        setLoading(false);
      }
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <LoadingSpinner className='h-8 w-8 text-[#EAAC2E]' />
          <h2 className='text-lg font-semibold text-gray-700'>Carregando...</h2>
        </div>
      </div>
    );
  }

  // Renderiza erro de permissão com opção de reenviar email
  if (isPermissionError) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4'>
        <Card className='border-yellow-200 bg-yellow-50 max-w-md'>
          <CardContent className='pt-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='font-semibold text-yellow-900'>
                    Conta não ativada
                  </p>
                  <p className='text-sm text-yellow-700 mt-1'>
                    {ordersError?.message ||
                      'Por favor, confirme seu e-mail para acessar esta funcionalidade.'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2 pt-2'>
                <Button
                  onClick={handleClick}
                  disabled={loading}
                  className='bg-[#EAAC2E] hover:bg-[#ffc947] w-full'
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className='mr-2 h-4 w-4' />
                      Enviando...
                    </>
                  ) : (
                    'Reenviar e-mail de ativação'
                  )}
                </Button>
                <p className='text-xs text-yellow-600 text-center'>
                  Verifique sua caixa de entrada e spam
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Renderiza outros tipos de erro
  if (error || ordersError) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4'>
        <Card className='border-red-200 bg-red-50 max-w-md'>
          <CardContent className='pt-6'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='h-5 w-5 text-red-600 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-semibold text-red-900'>Erro ao carregar</p>
                <p className='text-sm text-red-700 mt-1'>
                  {error ||
                    ordersError?.message ||
                    'Não foi possível carregar os dados do dashboard.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='bg-background'>
        <div className='grid lg:grid-cols-5'>
          <Sidebar className='hidden lg:block' />
          <div className='col-span-3 lg:col-span-4 lg:border-l'>
            <div className='h-full px-4 py-6 lg:px-8'>
              {/* Header Section */}
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                      Dashboard
                    </h1>
                    <p className='mt-2 text-lg text-gray-600'>
                      Bem-vindo de volta, {user?.name || 'Usuário'}!
                    </p>
                  </div>
                  <Restricted
                    to={Role.User}
                    fallback={
                      <div className='flex gap-3'>
                        <Button disabled variant='outline'>
                          <PlusCircle className='mr-2 h-4 w-4' />
                          Anunciar
                        </Button>
                        <ToolTipHelper
                          content='Ativar minha conta'
                          handleClick={handleClick}
                        />
                      </div>
                    }
                  >
                    <Button
                      onClick={() => router.push('/advertise')}
                      className='bg-[#EAAC2E] hover:bg-[#ffc947]'
                    >
                      <PlusCircle className='mr-2 h-4 w-4' />
                      Novo Anúncio
                    </Button>
                  </Restricted>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className='grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4'>
                <Card className='border-2 shadow-lg hover:shadow-xl transition-shadow'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-gray-600'>
                      Total de Anúncios
                    </CardTitle>
                    <div className='p-2 rounded-lg bg-blue-100'>
                      <FileText className='h-5 w-5 text-blue-600' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-gray-900'>
                      {ordersLoading ? '...' : statistics.total}
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      Todos os seus anúncios
                    </p>
                  </CardContent>
                </Card>

                <Card className='border-2 shadow-lg hover:shadow-xl transition-shadow'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-gray-600'>
                      Aguardando Aprovação
                    </CardTitle>
                    <div className='p-2 rounded-lg bg-yellow-100'>
                      <Clock className='h-5 w-5 text-yellow-600' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-gray-900'>
                      {ordersLoading ? '...' : statistics.pending}
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>Em análise</p>
                  </CardContent>
                </Card>

                <Card className='border-2 shadow-lg hover:shadow-xl transition-shadow'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-gray-600'>
                      Anúncios Aprovados
                    </CardTitle>
                    <div className='p-2 rounded-lg bg-green-100'>
                      <CheckCircle2 className='h-5 w-5 text-green-600' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-gray-900'>
                      {ordersLoading ? '...' : statistics.approved}
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      Publicados e ativos
                    </p>
                  </CardContent>
                </Card>

                <Card className='border-2 shadow-lg hover:shadow-xl transition-shadow'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-gray-600'>
                      Valor Total
                    </CardTitle>
                    <div className='p-2 rounded-lg bg-[#EAAC2E]/10'>
                      <TrendingUp className='h-5 w-5 text-[#EAAC2E]' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-gray-900'>
                      {ordersLoading
                        ? '...'
                        : new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(statistics.totalValue)}
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      Valor total dos anúncios
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs
                defaultValue='announcements'
                value={activeTab}
                onValueChange={setActiveTab}
                className='h-full space-y-6'
              >
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                  <TabsList className='grid w-full sm:w-auto grid-cols-2'>
                    <TabsTrigger value='announcements' className='relative'>
                      <Clock className='mr-2 h-4 w-4' />
                      Aguardando Aprovação
                      {statistics.pending > 0 && (
                        <span className='ml-2 rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-semibold text-white'>
                          {statistics.pending}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value='announcements-approved'>
                      <CheckCircle2 className='mr-2 h-4 w-4' />
                      Anunciados
                      {statistics.approved > 0 && (
                        <span className='ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white'>
                          {statistics.approved}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value='announcements'
                  className='border-none p-0 outline-none'
                >
                  {ordersLoading ? (
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='flex items-center justify-center py-12'>
                          <div className='flex flex-col items-center gap-4'>
                            <LoadingSpinner className='h-8 w-8 text-[#EAAC2E]' />
                            <p className='text-sm text-gray-600'>
                              Carregando anúncios...
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : filteredOrders.length === 0 ? (
                    <Card className='border-2 border-dashed'>
                      <CardContent className='pt-12 pb-12'>
                        <div className='flex flex-col items-center justify-center text-center'>
                          <div className='p-4 rounded-full bg-gray-100 mb-4'>
                            <FileText className='h-10 w-10 text-gray-400' />
                          </div>
                          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                            Nenhum anúncio aguardando aprovação
                          </h3>
                          <p className='text-sm text-gray-600 mb-6 max-w-sm'>
                            Você ainda não possui anúncios aguardando aprovação.
                            Crie seu primeiro anúncio para começar!
                          </p>
                          <Restricted to={Role.User}>
                            <Button
                              onClick={() => router.push('/advertise')}
                              className='bg-[#EAAC2E] hover:bg-[#ffc947]'
                            >
                              <PlusCircle className='mr-2 h-4 w-4' />
                              Criar Primeiro Anúncio
                            </Button>
                          </Restricted>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className='border-2 shadow-lg'>
                      <CardHeader>
                        <CardTitle>Anúncios Aguardando Aprovação</CardTitle>
                        <CardDescription>
                          Lista dos seus anúncios que estão em análise
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataTable columns={columns} data={filteredOrders} />
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent
                  value='announcements-approved'
                  className='border-none p-0 outline-none'
                >
                  {ordersLoading ? (
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='flex items-center justify-center py-12'>
                          <div className='flex flex-col items-center gap-4'>
                            <LoadingSpinner className='h-8 w-8 text-[#EAAC2E]' />
                            <p className='text-sm text-gray-600'>
                              Carregando anúncios...
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : filteredOrders.length === 0 ? (
                    <Card className='border-2 border-dashed'>
                      <CardContent className='pt-12 pb-12'>
                        <div className='flex flex-col items-center justify-center text-center'>
                          <div className='p-4 rounded-full bg-green-100 mb-4'>
                            <CheckCircle2 className='h-10 w-10 text-green-600' />
                          </div>
                          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                            Nenhum anúncio aprovado ainda
                          </h3>
                          <p className='text-sm text-gray-600 mb-6 max-w-sm'>
                            Seus anúncios aprovados aparecerão aqui assim que
                            forem validados pela nossa equipe.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className='border-2 shadow-lg'>
                      <CardHeader>
                        <CardTitle>Anúncios Aprovados</CardTitle>
                        <CardDescription>
                          Lista dos seus anúncios que foram aprovados e estão
                          publicados
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataTable columns={columns} data={filteredOrders} />
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
