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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreateAnnouncementSchema } from '@/app/advertise/_schemas/announcement.schema';

type AnnouncementDetailsSectionProps = {
  form: UseFormReturn<CreateAnnouncementSchema>;
  title: string;
};

export function AnnouncementDetailsSection({
  form,
  title,
}: AnnouncementDetailsSectionProps) {
  return (
    <Card className='border-2 shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-purple-100'>
            <FileText className='h-5 w-5 text-purple-600' />
          </div>
          <div>
            <CardTitle className='text-xl'>Informações do {title}</CardTitle>
            <CardDescription>Detalhes sobre o processo judicial</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-6 pt-6'>
        <div className='grid gap-4 sm:grid-cols-3'>
          <FormField
            control={form.control}
            name='lawSuit'
            render={({ field }) => (
              <FormItem className='sm:col-span-2'>
                <FormLabel className='text-base font-medium'>
                  Número do Processo
                </FormLabel>
                <FormControl>
                  <Input
                    className='h-12 text-base'
                    placeholder={`Informe o número do seu ${
                      title === 'RPV' ? 'RPV' : 'precatório'
                    }`}
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
            name='origin'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>Origem</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-12 text-base'>
                      <SelectValue placeholder='Selecione' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='federal'>Federal</SelectItem>
                    <SelectItem value='estadual'>Estadual</SelectItem>
                    <SelectItem value='municipal'>Municipal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='court'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>Tribunal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-12 text-base'>
                      <SelectValue placeholder='Selecione o tribunal' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='federal'>TRF-1</SelectItem>
                    <SelectItem value='estadual'>TRF-4</SelectItem>
                    <SelectItem value='estadual'>TRF-5</SelectItem>
                    <SelectItem value='estadual'>TJSP</SelectItem>
                    <SelectItem value='estadual'>TJMG</SelectItem>
                    <SelectItem value='estadual'>TJRS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
