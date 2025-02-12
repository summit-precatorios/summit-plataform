'use client'

import { columns } from '@/app/announcement/columns'
import { DataTable } from '@/app/announcement/data-table'
import { Sidebar } from '@/app/dashboard/_components/sidebar'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Restricted } from '@/components/restricted'
import { ToolTipHelper } from '@/components/tool-tip'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AuthContext } from '@/contexts/AuthContext'
import PermissionContext from '@/contexts/PermissionContext'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { verifyAccountByDocument } from '@/services/auth.service'
import { Role } from '@/types'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const { isAllowedTo } = useContext(PermissionContext)

  const { orders, loading, error } = useAnnouncements(user, isAllowedTo)

  async function handleClick() {
    const document = user?.document

    if (document) await verifyAccountByDocument({ document })
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
                        <ToolTipHelper content="" handleClick={handleClick} />
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
