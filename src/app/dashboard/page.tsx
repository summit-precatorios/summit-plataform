'use client'

import { columns } from '@/app/announcement/columns'
import { DataTable } from '@/app/announcement/data-table'
import { Sidebar } from '@/app/dashboard/_components/sidebar'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Restricted } from '@/components/restricted'
import { ToolTipHelper } from '@/components/tool-tip'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/contexts/AuthContext'
import PermissionContext from '@/contexts/PermissionContext'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { verifyAccountByDocument } from '@/services/auth.service'
import { Role } from '@/types'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const { isAllowedTo } = useContext(PermissionContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { orders } = useAnnouncements(user, isAllowedTo)

  const { toast } = useToast()

  async function handleClick() {
    const document = user?.document

    if (document) {
      setLoading(true)
      setError(null)

      try {
        const response = await verifyAccountByDocument({ document })

        if (response.success) {
          toast({
            variant: 'default',
            description:
              'E-mail com as informações para ativação da conta foi enviado com sucesso!',
          })
        } else {
          toast({
            variant: 'destructive',
            description: 'Ocorreu um erro ao enviar o e-mail de ativação.',
          })
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          description: 'Ocorreu um erro ao enviar o e-mail de ativação.',
        })
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className=" flex  items-center justify-center mt-4">
        <LoadingSpinner className="text-[#EAAC2E] mr-5" />
        <h2>Carregando...</h2>
      </div>
    )
  } else if (error) return <div>{error}</div>

  return (
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
                    to={Role.User}
                    fallback={
                      <div className="ml-auto mr-4 flex flex-row items-start">
                        <Button disabled>
                          <PlusCircle className="mr-4" size={22} />
                          Anunciar
                        </Button>
                        <ToolTipHelper
                          content="Ativar minha conta"
                          handleClick={handleClick}
                        />
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
                </TabsContent>
                <TabsContent
                  value="announcements-approved"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  Sem resultados.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
