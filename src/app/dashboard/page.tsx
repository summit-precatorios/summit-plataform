'use client'

import { Restricted } from '@/components/restricted'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthContext } from '@/contexts/AuthContext'
import { getAnnouncementsByUserDocument } from '@/services/user.service'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { CircleOff } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  // TODO Elaborar verificação de pr  ecatórios cadastrados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<Array<any>>([])

  useEffect(() => {
    async function fetchOrders() {
      const response = await getAnnouncementsByUserDocument(user!.document)
      const data = await response.json()

      console.log(data)
      setOrders(data)
    }

    if (user) fetchOrders()
  }, [user])

  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <Restricted to="common-user">
        <div className="hidden flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 mb-36">
              {/* <h2 className="text-3xl font-bold tracking-tight">Precatórios</h2> */}
            </div>

            {orders?.length > 0 ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">
                          Publicados
                        </CardTitle>
                        <span>
                          {
                            orders.filter(
                              (order) => order.status === 'published',
                            ).length
                          }
                        </span>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-medium mb-4">
                          informações do título
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <a href="#">Ver detalhes</a>
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">
                          Aguardando Aprovação
                        </CardTitle>
                        {orders.length}
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-medium mb-4">
                          informações do título
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <a href="#">Ver detalhes</a>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <Button asChild className="mt-10 py-6 px-8">
                  <Link href="/advertise">Criar novo Anúncio</Link>
                </Button>
              </Tabs>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <CircleOff width="121" height="121" color="#cecece" />
                <h1 className="text-3xl font-medium  text-center mt-4">
                  Você ainda não possui precatórios/RPVs anunciados
                </h1>

                <Button asChild className="mt-10 py-6 px-8">
                  <Link href="/advertise">Anunciar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Restricted>
    </Suspense>
  )
}
