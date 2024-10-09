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
import { forgotPassword } from '@/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
const formSchema = z.object({
  email: z.string().email('Insira um endereço de e-mail válido.'),
})

export function RecoveryPasswordForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await forgotPassword(data)

    if (!response) {
      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description:
          'Não foi possível processar a sua requisição. Tente novamente mais tarde.',
      })

      return
    }

    if (response && response.statusCode === 201) {
      toast({
        variant: 'default',
        description:
          'Caso este seja um email de usuário válido, você receberá um link no e-mail fornecido para recuperação da senha!',
      })

      form.reset()
    }
  }

  return (
    <div className="flex flex-col justify-center max-w-lg h-[80vh] mx-auto mt-3 max-sm:p-4 max-sm:justify-start max-md:p-4 max-md:justify-start">
      <h1 className="text-3xl font-semibold mb-4">Redefinir senha</h1>
      <span>
        Enviaremos por e-mail instruções sobre como redefinir sua senha.
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-16"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço de email</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@gmail.com" {...field} />
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
            {form.formState.isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
