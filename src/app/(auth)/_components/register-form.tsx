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
import { InputPassword } from '@/components/ui/input-password'
import { useToast } from '@/components/ui/use-toast'
import { handleApiError } from '@/lib/error-handler'
import { isCPFValid } from '@/lib/isCPFValid'
import { cpfMask } from '@/lib/utils'
import { registerRequest } from '@/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  UserCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Deve conter pelo menos 3 caracteres')
    .max(200, 'Deve conter no máximo 200 caracteres'),
  email: z
    .string()
    .email('Insira um endereço de e-mail válido.')
    .min(3, 'Deve conter pelo menos 3 caracteres')
    .max(200, 'Deve conter no máximo 200 caracteres'),
  document: z
    .string()
    .refine((document) => isCPFValid(document), {
      message: 'CPF inválido',
    })
    .transform((value) => value.replace(/\D/g, '')),
  password: z
    .string()
    .min(8, { message: 'Sua senha precisa de no mínimo 8 caracteres' }),
})

export function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()

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

      if (!response) {
        const errorToast = handleApiError({ statusCode: 500 })
        toast(errorToast)
        return
      }

      // Verifica se a resposta contém um erro
      if ('statusCode' in response && response.statusCode >= 400) {
        // Mantém o comportamento especial para 409 (conflito)
        if (response.statusCode === 409) {
          toast({
            variant: 'default',
            description:
              'Este CPF já está conectado a uma conta, por favor faça o login.',
            action: (
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Entrar</Link>
              </Button>
            ),
          })
          return
        }

        const errorToast = handleApiError({
          statusCode: response.statusCode,
          message: response.message || response.error,
        })
        toast(errorToast)
        return
      }

      if (!('statusCode' in response) || response.statusCode === 201) {
        toast({
          variant: 'default',
          title: 'Conta criada com sucesso!',
          description:
            'Enviamos um link de ativação para o seu e-mail. Verifique sua caixa de entrada.',
        })

        form.reset()
        router.push('/sign-in')
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para home
          </Link>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#EAAC2E]/10 flex items-center justify-center mb-4">
              <UserCircle className="h-8 w-8 text-[#EAAC2E]" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Criar sua conta
            </CardTitle>
            <CardDescription className="text-base">
              Preencha os dados abaixo para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <User className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="ex: João da Silva"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-base font-medium">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Mail className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="exemplo@gmail.com"
                            type="email"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-base font-medium">
                        CPF
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <UserCircle className="h-5 w-5" />
                          </div>
                          <Input
                            placeholder="000.000.000-00"
                            className="pl-10 h-12"
                            {...field}
                            onChange={(e) =>
                              field.onChange(cpfMask(e.target.value))
                            }
                          />
                        </div>
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
                      <FormLabel className="text-base font-medium">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Lock className="h-5 w-5" />
                          </div>
                          <InputPassword
                            placeholder="Mínimo 8 caracteres"
                            className="pl-10 h-12"
                            type="password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Mínimo 8 caracteres</span>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold mt-6"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? 'Criando conta...'
                    : 'Criar conta'}
                </Button>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      ou
                    </span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Já tem uma conta? </span>
                  <Link
                    href="/sign-in"
                    className="font-semibold text-[#EAAC2E] hover:underline transition-colors"
                  >
                    Entrar
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/terms" className="text-[#EAAC2E] hover:underline">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="text-[#EAAC2E] hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
