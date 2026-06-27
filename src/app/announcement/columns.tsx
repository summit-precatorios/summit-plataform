'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Announcement } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const STATUS_LABEL: Record<string, string> = {
  PENDENT: 'Pendente',
  APROVED: 'Aprovado',
  REPROVED: 'Reprovado',
};

const STATUS_CLASS: Record<string, string> = {
  PENDENT: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  APROVED: 'bg-green-100 text-green-800 hover:bg-green-100',
  REPROVED: 'bg-red-100 text-red-800 hover:bg-red-100',
};

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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = (row.getValue('status') as string) ?? 'PENDENT';
        return (
          <Badge className={STATUS_CLASS[status] ?? ''}>
            {STATUS_LABEL[status] ?? status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Data',
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as string;
        return date
          ? new Intl.DateTimeFormat('pt-BR').format(new Date(date))
          : '—';
      },
    },
    {
      accessorKey: 'salePrice',
      header: 'Preço de listagem',
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
      header: () => <div className='text-right'>Ações</div>,
      enableHiding: true,
      cell: ({ row }) => <RowActions row={row} actions={actions} />,
    },
  ];
}

function RowActions({ row }: { row: any; actions: ColumnActions }) {
  const router = useRouter();
  const id = row.getValue('id') as string;

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        variant='outline'
        size='sm'
        className='h-8 gap-1.5 text-xs hover:border-brand hover:text-brand hover:bg-brand/5'
        onClick={() => router.push(`/announcement/${id}`)}
      >
        <Eye className='h-3.5 w-3.5' />
        Detalhes
      </Button>
    </div>
  );
}
