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
import { AlertTriangle, CircleHelp, DollarSign, Info } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAnnouncementSchema } from '@/app/advertise/_schemas/announcement.schema';

type ValuesSectionProps = {
  form: UseFormReturn<CreateAnnouncementSchema>;
  title: string;
  formattedPrice: string;
  setFormattedPrice: Dispatch<SetStateAction<string>>;
  desiredAmount: string;
  setDesiredAmount: Dispatch<SetStateAction<string>>;
};

function parseAmount(value: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}

export function ValuesSection({
  form,
  title,
  formattedPrice,
  setFormattedPrice,
  desiredAmount,
  setDesiredAmount,
}: ValuesSectionProps) {
  const priceNumeric = parseAmount(formattedPrice);
  const desiredNumeric = parseAmount(desiredAmount);
  const salePriceNumeric = desiredNumeric > 0 ? desiredNumeric / 0.95 : 0;
  const platformFeeNumeric = salePriceNumeric - desiredNumeric;
  const desagioPercent =
    priceNumeric > 0 && salePriceNumeric > 0
      ? (1 - salePriceNumeric / priceNumeric) * 100
      : null;
  const isOverNominal = priceNumeric > 0 && salePriceNumeric > priceNumeric;
  const showSummary = desiredNumeric > 0;

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
        <div className='grid gap-4 sm:grid-cols-2'>
          {/* Valor Nominal */}
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
                        <p>Valor de face do {title} conforme o documento judicial</p>
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
                        .replace(/^R\$\s?/, '')
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

          {/* Quanto quer receber */}
          <FormItem>
            <FormLabel className='text-base font-medium flex items-center gap-2'>
              Quanto quer receber?
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className='h-4 w-4 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>
                    <p>
                      Valor líquido que você deseja receber após a taxa da
                      plataforma (5%). O preço de listagem é calculado
                      automaticamente.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormLabel>
            <FormControl>
              <InputCurrency
                className='h-12 text-base'
                value={desiredAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const formatted = currencyFormatter
                    .format(Number(value) / 100)
                    .replace(/^R\$\s?/, '')
                    .trim();
                  setDesiredAmount(formatted);
                }}
              />
            </FormControl>
            <FormDescription className='text-sm text-gray-500'>
              O valor que cairá na sua conta após a taxa
            </FormDescription>
          </FormItem>

          {/* Preço de listagem (derivado) */}
          <FormField
            control={form.control}
            name='salePrice'
            render={({ field }) => (
              <FormItem className='sm:col-span-2'>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  Preço de listagem
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelp className='h-4 w-4 text-gray-400' />
                      </TooltipTrigger>
                      <TooltipContent className='max-w-xs'>
                        <p>
                          Valor que o comprador pagará. Calculado
                          automaticamente: o que você quer receber ÷ 0,95.
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
                  Calculado automaticamente (valor desejado ÷ 0,95)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Resumo financeiro */}
        {showSummary && (
          <div
            className={`rounded-lg border-2 p-4 space-y-3 ${
              isOverNominal
                ? 'border-amber-300 bg-amber-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <p className='text-sm font-semibold text-gray-700'>
              Resumo financeiro
            </p>

            {isOverNominal && (
              <div className='flex items-start gap-2 text-amber-700 text-sm'>
                <AlertTriangle className='h-4 w-4 mt-0.5 flex-shrink-0' />
                <span>
                  O valor desejado resulta em um preço de listagem superior ao
                  valor nominal. Compradores dificilmente aceitarão esse preço.
                </span>
              </div>
            )}

            <div className='grid gap-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Valor Nominal</span>
                <span className='font-medium text-gray-700'>
                  {priceNumeric > 0
                    ? currencyFormatter.format(priceNumeric)
                    : '—'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Preço de listagem</span>
                <span className='font-medium text-gray-900'>
                  {currencyFormatter.format(salePriceNumeric)}
                </span>
              </div>
              <div className='flex justify-between text-red-600'>
                <span>Taxa da plataforma (5%)</span>
                <span className='font-medium'>
                  − {currencyFormatter.format(platformFeeNumeric)}
                </span>
              </div>
              <div className='flex justify-between pt-2 border-t border-gray-200'>
                <span className='font-semibold text-gray-900'>
                  Você recebe
                </span>
                <span className='font-bold text-green-700'>
                  {currencyFormatter.format(desiredNumeric)}
                </span>
              </div>

              {desagioPercent !== null && (
                <div className='flex justify-between pt-1'>
                  <span className='text-gray-500'>Deságio implícito</span>
                  <span
                    className={`font-medium ${
                      desagioPercent < 0
                        ? 'text-red-600'
                        : desagioPercent < 10
                          ? 'text-amber-600'
                          : 'text-gray-700'
                    }`}
                  >
                    {desagioPercent.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
