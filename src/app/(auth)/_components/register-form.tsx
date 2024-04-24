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
import { InputPassword } from '@/components/ui/input-password'
import { useToast } from '@/components/ui/use-toast'
import { AuthContext } from '@/contexts/AuthContext'
import { cpfMask } from '@/lib/utils'
import { validate } from '@/lib/validate'
import { registerRequest } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Deve conter pelo menos 3 caracteres')
    .max(200, 'Deve conter no máximo 200 caracteres'),
  email: z.string().email('Insira um endereço de e-mail válido.'),
  document: z
    .string()
    .refine((document) => validate(document), {
      message: 'CPF inválido',
    })
    .transform((value) => value.replace(/\D/g, '')),
  password: z
    .string()
    .min(8, { message: 'Sua senha precisa de no mínimo 8 caracteres' }),
})

export function RegisterForm() {
  const { toast } = useToast()
  const { signIn } = useContext(AuthContext)

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
      const response = await registerRequest(data)

      console.log(response)

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Erro interno',
          description: 'Não foi possível processar a sua requisição',
        })

        return
      }

      if (response.message === '409') {
        toast({
          variant: 'default',
          description:
            'Este CPF já está conectado a uma conta, por favor faça o login.',
          action: (
            <Button asChild>
              <Link href="/signin">Entrar</Link>
            </Button>
          ),
        })
      }

      if (response.message === 'resource created') {
        toast({
          variant: 'default',
          description: 'Sua conta foi registrada com sucesso.',
        })

        await signIn(data)
      }

      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }
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
                  <Input
                    placeholder="Informe o seu CPF"
                    {...field}
                    onChange={(e) => field.onChange(cpfMask(e.target.value))}
                  />
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
            <Button type="submit" className="w-full h-12">
              {form.formState.isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
            <p>
              Já tem uma conta?{' '}
              <span>
                <Link
                  href="/signin"
                  className="text-[#EAAC2E] hover:opacity-80"
                >
                  Entrar
                </Link>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
