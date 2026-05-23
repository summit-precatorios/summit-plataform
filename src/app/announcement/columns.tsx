'use client';

import { Restricted } from '@/components/restricted';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { updateAnnouncementStatus } from '@/services/announcement.service';
import { Announcement, Role } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type ColumnActions = {
  onStatusChange?: (id: string, status: 'APROVED' | 'REPROVED') => Promise<void>;
};

export function getColumns(actions: ColumnActions = {}): ColumnDef<Announcement>[] {
  return [
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
        const price = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: 'salePrice',
      header: 'Valor de Venda',
      cell: ({ row }) => {
        const salePrice = parseFloat(row.getValue('salePrice'));
        const formatted = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(salePrice);
        return <div>{formatted}</div>;
      },
    },
    {
      id: 'options',
      header: () => <div className='text-right'>Opções</div>,
      enableHiding: true,
      cell: ({ row }) => <RowActions row={row} actions={actions} />,
    },
  ];
}

function RowActions({
  row,
  actions,
}: {
  row: any;
  actions: ColumnActions;
}) {
  const { toast } = useToast();

  async function handleStatusChange(status: 'APROVED' | 'REPROVED') {
    const id = row.getValue('id') as string;
    try {
      if (actions.onStatusChange) {
        await actions.onStatusChange(id, status);
      } else {
        await updateAnnouncementStatus(id, status);
      }
      toast({
        variant: 'default',
        title: status === 'APROVED' ? 'Anúncio aprovado!' : 'Anúncio reprovado!',
        description:
          status === 'APROVED'
            ? 'O anúncio foi aprovado e publicado na vitrine.'
            : 'O anúncio foi reprovado.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar status',
        description: 'Não foi possível atualizar o status. Tente novamente.',
      });
    }
  }

  return (
    <div className='text-right'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Restricted to={[Role.Admin, Role.User]}>
            <DropdownMenuItem
              onClick={() => {
                const id = row.getValue('id');
                window.location.href = `/announcement/${id}`;
              }}
              className='hover:cursor-pointer'
            >
              Ver detalhes do Anúncio
            </DropdownMenuItem>
          </Restricted>

          <Restricted to={Role.Admin}>
            <DropdownMenuItem
              onClick={() => handleStatusChange('APROVED')}
              className='hover:cursor-pointer'
            >
              Aprovar Anúncio
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange('REPROVED')}
              className='hover:cursor-pointer text-red-600 focus:text-red-600'
            >
              Reprovar Anúncio
            </DropdownMenuItem>
          </Restricted>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
