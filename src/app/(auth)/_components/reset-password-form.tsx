import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputPassword } from '@/components/ui/input-password';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { ArrowLeft, Lock, Mail, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Data = {
  user: {
    email: string;
    document: string;
  };
};

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
  });

export function ResetPasswordForm({
  params,
}: {
  params: { token: string | string[] };
}) {
  const [data, setData] = useState<Data | undefined>();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecoded: Data = jwtDecode(params.token as string);
      setData(tokenDecoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Token inválido',
        description: 'O link de recuperação é inválido ou expirou.',
      });
      router.push('/reset/password');
    }
  }, [router, params.token, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const enrichmentData = {
      ...data,
      token: params.token,
    };

    try {
      const response = await api<{ statusCode?: number; message?: string }>(
        'auth/reset/password',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify(enrichmentData, null, 2),
        }
      );

      if (response && (response.statusCode === 200 || !response.statusCode)) {
        toast({
          variant: 'default',
          title: 'Senha alterada com sucesso!',
          description: 'Sua senha foi redefinida. Você já pode fazer login.',
        });

        form.reset();
        router.push('/sign-in');
      } else {
        toast({
          variant: 'destructive',
          description: response?.message || 'Token inválido ou expirado',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Não foi possível alterar a senha. Tente novamente.',
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Back Button */}
        <div className="mb-8">
          <Link
            href="/sign-in"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para login
          </Link>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#EAAC2E]/10 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-[#EAAC2E]" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Redefinir senha
            </CardTitle>
            <CardDescription className="text-base">
              Defina uma nova senha para sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.user?.email && (
              <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Conta verificada
                    </p>
                    <p className="text-sm text-gray-600">{data.user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Nova senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Lock className="h-5 w-5" />
                          </div>
                          <InputPassword
                            placeholder="Mínimo 8 caracteres"
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
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Confirmar senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Lock className="h-5 w-5" />
                          </div>
                          <InputPassword
                            placeholder="Digite a senha novamente"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Dica:</strong> Use uma senha forte com pelo menos 8
                    caracteres, incluindo letras, números e símbolos.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? 'Redefinindo...'
                    : 'Redefinir senha'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
