'use client'

import { columns } from '@/app/announcement/columns'
import { DataTable } from '@/app/announcement/data-table'
import { Sidebar } from '@/app/dashboard/_components/sidebar'
import { Restricted } from '@/components/restricted'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/contexts/AuthContext'
import PermissionContext from '@/contexts/PermissionContext'
import { activeAccount } from '@/services/auth.service'
import { getAnnouncementsByUserDocument } from '@/services/user.service'
import { Announcement } from '@/types'
import { CircleHelp, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'

export default function DashboardPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const { isAllowedTo } = useContext(PermissionContext)

  const [orders, setOrders] = useState<Announcement[]>([])

  async function handleClick() {
    const { 'summit.token': token } = parseCookies()

    const response = await activeAccount({ token })

    if (!response) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description:
          'Não foi possível processar a sua requisição. Tente novamente mais tarde.',
      })
    }

    if (response?.statusCode === 200) {
      toast({
        variant: 'default',
        title: 'Ativação da conta',
        description: 'Sua conta foi ativada com sucesso!',
      })
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      const response = await getAnnouncementsByUserDocument(user!.document)

      setOrders(response)

      console.log(response)
    }

    if (user) fetchOrders()
  }, [user, isAllowedTo])
  return (
    <>
      <div className="hidden md:block">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="announcements" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="announcements" className="relative">
                        Aguardando Aprovação
                      </TabsTrigger>
                      <TabsTrigger value="announcements-approved">
                        Anunciados
                      </TabsTrigger>
                    </TabsList>
                    <Restricted
                      to="common-user"
                      fallback={
                        <div className="ml-auto mr-4 flex flex-row items-start">
                          <Button disabled>
                            <PlusCircle className="mr-4" size={22} />
                            Anunciar
                          </Button>
                          <span>
                            <CircleHelp
                              size={16}
                              className="ml-1 cursor-pointer text-red-300"
                              onClick={() => {
                                toast({
                                  title: 'Ação não permitida',
                                  description:
                                    'É preciso ativar a sua conta para continuar',
                                  action: (
                                    <ToastAction
                                      altText="Enviamos um email com as instruções"
                                      onClick={() => handleClick()}
                                    >
                                      Ativar
                                    </ToastAction>
                                  ),
                                })
                              }}
                            />
                          </span>
                        </div>
                      }
                    >
                      <div className="ml-auto mr-4">
                        <Button onClick={() => router.push('/advertise')}>
                          <PlusCircle className="mr-4" size={22} />
                          Anunciar
                        </Button>
                      </div>
                    </Restricted>
                  </div>
                  <TabsContent
                    value="announcements"
                    className="border-none p-0 outline-none"
                  >
                    <DataTable columns={columns} data={orders} />
                    {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
                  </TabsContent>
                  <TabsContent
                    value="announcements-approved"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    {/* <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Identificação do Título
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Descrição
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" /> */}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
