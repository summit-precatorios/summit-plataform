'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { validate } from '@/lib/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Deve conter pelo menos 3 caracteres')
    .max(200, 'Deve conter no máximo 200 caracteres'),
  email: z.string().email('Insira um endereço de e-mail válido.'),
  document: z.string().refine((document) => validate(document), {
    message: 'CPF inválido',
  }),
  password: z
    .string()
    .min(8, { message: 'Sua senha precisa de no mínimo 8 caracteres' }),
})

export function RegisterForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: '',
      email: '',
      fullName: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data)
      toast({
        variant: 'destructive',
        description: 'Sua conta foi criada com sucesso!',
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado',
        description:
          'Não foi possível a criação da sua conta. Tente novamnte mais tarde',
      })
    }

    form.reset()
  }

  return (
    <div className="w-96 m-auto">
      <h1 className="text-3xl font-semibold mb-4">Criar conta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="ex: João da Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o seu CPF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    placeholder="Search..."
                    type="search"
                  />
                  <Input placeholder="Define sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-white">
            Registrar
          </Button>
          <Eye /> <EyeOff />
        </form>
      </Form>
    </div>
  )
}
