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
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

type Data = {
  user: {
    email: string
    document: string
  }
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Sua senha precisa de no mínimo 8 caracteres' }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'A confirmação da senha não coincide',
    path: ['confirm'],
  })

export function ResetPasswordForm({
  params,
}: {
  params: { token: string | string[] }
}) {
  const [data, setData] = useState<Data | undefined>()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    try {
      const tokenDecoded: Data = jwtDecode(params.token as string)
      console.log(tokenDecoded)
      setData(tokenDecoded)
    } catch (error) {
      console.log(error)
      router.push('/reset/password')
    }
  }, [router, params.token])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const enrichmentData = {
      ...data,
      token: params.token,
    }

    const response = await api('reset-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.API_KEY}`,
      },
      body: JSON.stringify(enrichmentData, null, 2),
    })

    if (!response) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição',
      })
    }

    if (response.ok) {
      toast({
        variant: 'default',
        description: 'Sua senha foi alterada com sucesso.',
      })
    }
  }

  return (
    <div className="flex flex-col justify-center max-w-lg h-[80vh] mx-auto mt-3 max-sm:p-4 max-sm:justify-start max-md:p-4 max-md:justify-start">
      <h1 className="text-3xl font-semibold mb-4">Redefinir senha</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-16"
        >
          <FormItem>
            <FormLabel>Endereço de email</FormLabel>
            <Input value={data?.user.email} disabled />
          </FormItem>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPassword type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <InputPassword type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Enviando...' : 'Redefinir senha'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
