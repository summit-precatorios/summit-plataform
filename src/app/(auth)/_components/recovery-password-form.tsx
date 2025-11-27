'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { handleApiError } from '@/lib/error-handler'
import { forgotPassword } from '@/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Mail, Send } from 'lucide-react'
import Link from 'next/link'
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
    try {
      const response = await forgotPassword(data)

      if (!response) {
        const errorToast = handleApiError({ statusCode: 500 })
        toast(errorToast)
        return
      }

      // Verifica se a resposta contém um erro
      if ('statusCode' in response && response.statusCode >= 400) {
        const errorToast = handleApiError({
          statusCode: response.statusCode,
          message: response.message || response.error,
        })
        toast(errorToast)
        return
      }

      if (response && (response.statusCode === 201 || !response.statusCode)) {
        toast({
          variant: 'default',
          title: 'E-mail enviado com sucesso!',
          description:
            'Caso este seja um e-mail válido, você receberá instruções para redefinir sua senha.',
        })

        form.reset()
      }
    } catch (error) {
      const errorToast = handleApiError(
        error && typeof error === 'object' && 'statusCode' in error
          ? (error as { statusCode?: number; message?: string })
          : error,
      )
      toast(errorToast)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12'>
      <div className='w-full max-w-md'>
        {/* Logo/Back Button */}
        <div className='mb-8'>
          <Link
            href='/sign-in'
            className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar para login
          </Link>
        </div>

        <Card className='border-2 shadow-xl'>
          <CardHeader className='space-y-1 text-center pb-6'>
            <div className='mx-auto w-16 h-16 rounded-full bg-[#EAAC2E]/10 flex items-center justify-center mb-4'>
              <Mail className='h-8 w-8 text-[#EAAC2E]' />
            </div>
            <CardTitle className='text-3xl font-bold'>
              Recuperar senha
            </CardTitle>
            <CardDescription className='text-base'>
              Informe seu e-mail e enviaremos instruções para redefinir sua
              senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium'>
                        Endereço de e-mail
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                            <Mail className='h-5 w-5' />
                          </div>
                          <Input
                            placeholder='exemplo@gmail.com'
                            type='email'
                            className='pl-10 h-12'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='rounded-lg bg-blue-50 border border-blue-200 p-4'>
                  <p className='text-sm text-blue-800'>
                    <strong>Importante:</strong> Verifique sua caixa de entrada
                    e também a pasta de spam. O link de recuperação expira em 1
                    hora.
                  </p>
                </div>

                <Button
                  type='submit'
                  className='w-full h-12 text-base font-semibold'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className='mr-2 h-5 w-5' />
                      Enviar instruções
                    </>
                  )}
                </Button>

                <div className='text-center text-sm'>
                  <span className='text-gray-600'>Lembrou sua senha? </span>
                  <Link
                    href='/sign-in'
                    className='font-semibold text-[#EAAC2E] hover:underline transition-colors'
                  >
                    Voltar para login
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
