'use client'

import { Restricted } from '@/components/restricted'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Announcement, Role } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

export const columns: ColumnDef<Announcement>[] = [
  {
    accessorKey: 'id',
  },
  {
    accessorKey: 'lawSuit',
    header: 'Número do Processo',
  },
  {
    accessorKey: 'ownerFullName',
    header: 'Nome do Proprietário',
  },
  {
    accessorKey: 'ownerDocument',
    header: 'CPF',
  },
  {
    accessorKey: 'paymentOption',
    header: 'Método de Pagamento',
  },
  {
    accessorKey: 'type',
    header: 'Título',
  },
  {
    accessorKey: 'price',
    header: 'Valor do Título',
    cell: ({ row }) => {
      const salePrice = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(salePrice)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'salePrice',
    header: 'Valor de Venda',
    cell: ({ row }) => {
      const salePrice = parseFloat(row.getValue('salePrice'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(salePrice)

      return <div>{formatted}</div>
    },
  },
  {
    id: 'options',
    header: () => <div className="text-right">Opções</div>,
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Restricted to={[Role.Admin, Role.User]}>
                <DropdownMenuItem
                  onClick={() => {
                    const id = row.getValue('id')
                    window.location.href = `/announcement/${id}`
                  }}
                  className="hover:cursor-pointer"
                >
                  Ver detalhes do Anúncio
                </DropdownMenuItem>
              </Restricted>

              <Restricted to={Role.Admin}>
                <DropdownMenuItem onClick={() => alert('Anúncio Aprovado')}>
                  Aprovar Anúncio
                </DropdownMenuItem>
              </Restricted>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
