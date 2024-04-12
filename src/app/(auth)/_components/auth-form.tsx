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
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  document: z.string().min(1, 'O campo de CPF é obrigatório.'),
  password: z.string().min(1, 'Informe a sua senha.'),
})

export function AuthForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:4004/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2),
      })

      console.log(await response.json())
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Falha de Autenticação',
        description: 'Credenciais de acesso inválidas',
      })
    }

    form.reset()
  }
  return (
    <div className="w-96 m-auto">
      <h1 className="text-3xl font-semibold mb-4">Entrar</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <div className="flex justify-start w-96 mb-8">
            <p className="text-base font-normal">
              Esqueceu sua senha?{' '}
              <Link
                href="/forget-password"
                className="text-[#EAAC2E] hover:opacity-80"
              >
                Recuperar senha
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="text-white h-12"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Acessando...' : 'Acessar conta'}
            </Button>
            <p>
              Não tem uma conta?{' '}
              <span>
                <a href="/register" className="text-[#EAAC2E] hover:opacity-80">
                  Criar conta
                </a>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
