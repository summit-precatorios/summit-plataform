'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthContext } from '@/contexts/AuthContext'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { CircleOff } from 'lucide-react'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext)

  // TODO Elaborar verificação de precatórios cadastrados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<Array<any>>([])

  useEffect(() => {
    setOrders([{}])
  }, [])

  if (!isAuthenticated)
    return (
      <div className="text-center h-96 mt-10 m-auto max-sm:p-4 w-4/5">
        <h1 className="text-xl">
          Você precisa estar autenticado para acessar esta página.
        </h1>
        <Button variant={'default'} asChild className="mt-10 max-sm:w-full">
          <Link href="/signin">Entrar</Link>
        </Button>
      </div>
    )

  return (
    <>
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
                      0
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
    </>
  )
}
