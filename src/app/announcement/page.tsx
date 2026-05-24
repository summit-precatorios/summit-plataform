import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anúncios | Summit Precatórios',
  description:
    'Veja os precatórios e RPVs disponíveis para negociação na plataforma Summit.',
};

type PublicAnnouncement = {
  id: string;
  title: string | null;
  type: string;
  lawSuit: string;
  origin: string;
  court: string;
  price: string;
  salePrice: string;
  liquidBalance: string;
  paymentOption: string;
  createdAt: string;
};

async function getPublicAnnouncements(): Promise<PublicAnnouncement[]> {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  if (!apiUrl || !apiKey) return [];

  try {
    const res = await fetch(`${apiUrl}announcement/public`, {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

const formatCurrency = (value: string) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    parseFloat(value)
  );

export default async function PublicAnnouncementsPage() {
  const announcements = await getPublicAnnouncements();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            Precatórios Disponíveis
          </h1>
          <p className='mt-3 text-xl text-gray-600'>
            Explore os precatórios e RPVs disponíveis para negociação.
          </p>
        </div>

        {announcements.length === 0 ? (
          <Card className='border-2 border-dashed'>
            <CardContent className='pt-12 pb-12'>
              <div className='flex flex-col items-center justify-center text-center'>
                <div className='p-4 rounded-full bg-gray-100 mb-4'>
                  <FileText className='h-10 w-10 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Nenhum anúncio disponível
                </h3>
                <p className='text-sm text-gray-600 max-w-sm'>
                  Não há precatórios disponíveis para negociação no momento.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {announcements.map((item) => (
              <Link key={item.id} href={`/announcement/${item.id}`}>
                <Card className='border-2 hover:border-brand transition-all duration-300 hover:shadow-lg h-full cursor-pointer'>
                  <CardHeader>
                    <div className='flex items-start justify-between gap-2'>
                      <CardTitle className='text-base leading-snug'>
                        {item.title ?? `Direitos Creditórios - ${item.type}`}
                      </CardTitle>
                      <Badge variant='outline' className='shrink-0'>
                        {item.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-2 text-sm text-gray-600'>
                    <div className='flex justify-between'>
                      <span>Processo</span>
                      <span className='font-mono font-medium text-gray-900 truncate ml-2'>
                        {item.lawSuit}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Tribunal</span>
                      <span className='font-medium text-gray-900'>{item.court}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Valor de Venda</span>
                      <span className='font-bold text-brand'>
                        {formatCurrency(item.salePrice)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Saldo Líquido</span>
                      <span className='font-medium text-gray-900'>
                        {formatCurrency(item.liquidBalance)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
