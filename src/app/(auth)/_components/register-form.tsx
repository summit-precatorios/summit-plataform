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
import { useToast } from '@/components/ui/use-toast'
import { validate } from '@/lib/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { InputPassword } from '@/components/ui/input-password'
import Link from 'next/link'

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
      const response = await fetch('http://localhost:4004/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2),
      })

      console.log(await response.json())

      if (response.ok)
        toast({
          variant: 'default',
          title: 'Conta criada com sucesso!',
          description: 'Parabéns! Sua conta foi criada com sucesso!',
        })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado',
        description:
          'Não foi possível a criação da sua conta. Tente novamente mais tarde',
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
                  <InputPassword
                    placeholder="Define sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-5 items-center">
            <Button type="submit" className="text-white w-full">
              Registrar
            </Button>
            <Link href="/" className="text-black font-semibold">
              Voltar
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
