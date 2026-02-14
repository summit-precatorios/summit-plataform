import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cpfMask } from '@/lib/utils';
import { FileText, User } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAnnouncementSchema } from '@/app/advertise/_schemas/announcement.schema';

type OwnerSectionProps = {
  form: UseFormReturn<CreateAnnouncementSchema>;
};

export function OwnerSection({ form }: OwnerSectionProps) {
  return (
    <Card className='border-2 shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-blue-100'>
            <User className='h-5 w-5 text-blue-600' />
          </div>
          <div>
            <CardTitle className='text-xl'>Dados do Proprietário</CardTitle>
            <CardDescription>
              Informações sobre o proprietário do precatório
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-6 pt-6'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='ownerFullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  <User className='h-4 w-4 text-gray-500' />
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input
                    className='h-12 text-base'
                    placeholder='Ex: João da Silva'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='ownerDocument'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium flex items-center gap-2'>
                  <FileText className='h-4 w-4 text-gray-500' />
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    className='h-12 text-base'
                    placeholder='000.000.000-00'
                    {...field}
                    onChange={(e) => field.onChange(cpfMask(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
