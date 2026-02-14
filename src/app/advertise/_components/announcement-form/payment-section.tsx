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
import { Label } from '@/components/ui/label';
import { cnpjMask, cpfMask, pixKeysMask } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { CreditCard, Landmark } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAnnouncementSchema } from '@/app/advertise/_schemas/announcement.schema';
import { PaymentMethod } from '@/types';

type PaymentSectionProps = {
  form: UseFormReturn<CreateAnnouncementSchema>;
  selectedOption: PaymentMethod;
  onSelectOption: (value: PaymentMethod) => void;
  documentBankAccount: string;
  setDocumentBankAccount: Dispatch<SetStateAction<string>>;
};

export function PaymentSection({
  form,
  selectedOption,
  onSelectOption,
  documentBankAccount,
  setDocumentBankAccount,
}: PaymentSectionProps) {
  return (
    <Card className='border-2 shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-brand/10'>
            <CreditCard className='h-5 w-5 text-brand' />
          </div>
          <div>
            <CardTitle className='text-xl'>Dados para Recebimento</CardTitle>
            <CardDescription>
              Informe como deseja receber o pagamento
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-6 pt-6'>
        <RadioGroup
          value={selectedOption}
          onValueChange={(value: PaymentMethod) => onSelectOption(value)}
          className='grid gap-4 sm:grid-cols-2'
        >
          <div>
            <RadioGroupItem value='PIX' id='pix' className='peer sr-only' />
            <Label
              htmlFor='pix'
              className={`flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedOption === 'PIX'
                  ? 'border-brand bg-brand/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className='p-3 rounded-full bg-blue-100 mb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 48 48'
                >
                  <path
                    fill='#37c6d0'
                    d='M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475	l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z'
                  />
                  <path
                    fill='#fff'
                    d='M38.78,14H36.1c-1.07,0-2.07,0.42-2.83,1.17l-6.8,6.78c-0.68,0.68-1.58,1.02-2.47,1.02	s-1.79-0.34-2.47-1.02l-6.8-6.78C13.97,14.42,12.97,14,11.9,14H9.22l2-2h0.68c1.6,0,3.11,0.62,4.24,1.76l6.8,6.77	c0.59,0.59,1.53,0.59,2.12,0l6.8-6.77C32.99,12.62,34.5,12,36.1,12h0.68L38.78,14z M36.1,34c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78	c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l2,2h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77	c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36h0.68l2-2H36.1z'
                  />
                </svg>
              </div>
              <span className='font-semibold text-base'>PIX</span>
              <span className='text-sm text-gray-600 mt-1'>
                Recebimento instantâneo
              </span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value='TRANSFER_BANK'
              id='transfer_bank'
              className='peer sr-only'
            />
            <Label
              htmlFor='transfer_bank'
              className={`flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedOption === 'TRANSFER_BANK'
                  ? 'border-brand bg-brand/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className='p-3 rounded-full bg-green-100 mb-3'>
                <Landmark className='h-8 w-8 text-green-600' />
              </div>
              <span className='font-semibold text-base'>
                Transferência Bancária
              </span>
              <span className='text-sm text-gray-600 mt-1'>
                DADOS bancários
              </span>
            </Label>
          </div>
        </RadioGroup>

        {selectedOption === 'PIX' ? (
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='pixKey'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    Chave PIX
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='h-12 text-base'
                      placeholder='Digite ou cole a sua chave PIX'
                      {...field}
                      onChange={(e) => {
                        const maskedValue = pixKeysMask(e.target.value);
                        field.onChange(maskedValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    CPF, e-mail, telefone, chave aleatória ou CNPJ
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='ownerBankAccount'
              render={({ field }) => (
                <FormItem className='sm:col-span-2'>
                  <FormLabel className='text-base font-medium'>
                    Titular da Conta
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='h-12 text-base'
                      placeholder='Nome completo do favorecido'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='documentBankAccount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    CPF/CNPJ
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='h-12 text-base'
                      placeholder='000.000.000-00'
                      value={documentBankAccount}
                      onChange={(e) => {
                        const clearValue = e.target.value.replace(/\D/g, '');
                        if (clearValue.length <= 11) {
                          setDocumentBankAccount(cpfMask(clearValue));
                        } else {
                          setDocumentBankAccount(cnpjMask(clearValue));
                        }
                        field.onChange(clearValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bankAccount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>Conta</FormLabel>
                  <FormControl>
                    <Input
                      className='h-12 text-base'
                      placeholder='Número da conta'
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ''))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='agencyBankAccount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    Agência
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='h-12 text-base'
                      placeholder='Sem dígito verificador'
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ''))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
