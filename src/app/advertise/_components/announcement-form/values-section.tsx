import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputCurrency } from '@/components/ui/input-currency';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { currencyFormatter } from '@/lib/utils';
import { CircleHelp, DollarSign, Info } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAnnouncementSchema } from '@/app/advertise/_schemas/announcement.schema';

type ValuesSectionProps = {
  form: UseFormReturn<CreateAnnouncementSchema>;
  title: string;
  formattedPrice: string;
  setFormattedPrice: Dispatch<SetStateAction<string>>;
  salePrice: string;
  setSalePrice: Dispatch<SetStateAction<string>>;
};

export function ValuesSection({
  form,
  title,
  formattedPrice,
  setFormattedPrice,
  salePrice,
  setSalePrice,
}: ValuesSectionProps) {
  return (
    <Card className='border-2 shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-green-100'>
            <DollarSign className='h-5 w-5 text-green-600' />
          </div>
          <div>
            <CardTitle className='text-xl'>Valores</CardTitle>
            <CardDescription>Informe os valores do seu {title}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-6 pt-6'>
        <div className='grid gap-4 sm:grid-cols-3'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  Valor Nominal
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className='h-4 w-4 text-gray-400' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Valor original do {title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <InputCurrency
                    className='h-12 text-base'
                    {...field}
                    value={formattedPrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const formatted = currencyFormatter
                        .format(Number(value) / 100)
                        .replace(/^R\$/, '')
                        .trim();
                      setFormattedPrice(formatted);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='salePrice'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  Valor de Venda
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className='h-4 w-4 text-gray-400' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Valor que você deseja receber pela venda</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <InputCurrency
                    className='h-12 text-base'
                    {...field}
                    value={salePrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const formatted = currencyFormatter
                        .format(Number(value) / 100)
                        .replace(/^R\$/, '')
                        .trim();
                      setSalePrice(formatted);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='liquidBalance'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  Saldo Líquido
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className='h-4 w-4 text-gray-400' />
                      </TooltipTrigger>
                      <TooltipContent className='max-w-xs'>
                        <p>
                          Valor líquido após a taxa de 5%. Calculado
                          automaticamente como 95% do valor de venda.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      className='h-12 text-base bg-gray-50 border-2 border-gray-200'
                      disabled
                      value={`R$ ${field.value || '0,00'}`}
                      readOnly
                    />
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      <Info className='h-5 w-5 text-gray-400' />
                    </div>
                  </div>
                </FormControl>
                <FormDescription className='flex items-center gap-1 text-sm text-gray-600'>
                  <Info className='h-3 w-3' />
                  Calculado automaticamente (95% do valor de venda)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
