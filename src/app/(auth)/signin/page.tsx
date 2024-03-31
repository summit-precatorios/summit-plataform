'use client'

import InputGroup from '@/components/InputGroup'
import PasswordInput from '@/components/PasswordInput'
import { Button, Link, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { redirect } from 'next/navigation'
import { checkDocument } from '@/utils/checkDocument'

const registerUserSchema = z.object({
  document: z
    .string()
    .refine(
      (document: string) => checkDocument(document),
      'Por favor, informe um CPF válido',
    ),
  password: z.string(),
})

export default function Signin() {
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  })

  async function registerUser(data: unknown) {
    const response = await fetch('http://localhost:4004/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    })

    if (response.status === 401) {
      toast({
        title: 'Erro de Autenticação',
        status: 'error',
        description: 'Login e/ou senha incorretos',
      })
    } else {
      return redirect('/profile')
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(registerUser)}
      >
        <div className="flex flex-col items-center mt-8 p-1 w-full">
          <div className="flex justify-start mb-8 w-96">
            <h1 className="text-4xl font-semibold">Entrar</h1>
          </div>
          <InputGroup
            label="CPF"
            htmlFor="document"
            inputType="text"
            placeholder="Informe o seu CPF"
            inputName="document"
            inputId="document"
            register={register}
          />
          {errors && (
            <>
              <div className="flex justify-start w-96">
                <span className="text-sm text-red-500 mb-2">
                  {errors.document?.message}
                </span>
              </div>
            </>
          )}

          <PasswordInput
            htmlFor="password"
            inputId="password"
            inputName="password"
            inputType="password"
            label="Senha"
            placeholder="Digite sua senha"
            register={register}
          />
          <div className="flex justify-start w-96 mb-8">
            <p className="text-base font-normal">
              Esqueceu sua senha?{' '}
              <Link className="text-[#EAAC2E]" _hover={{ opacity: 0.7 }}>
                Recuperar senha
              </Link>
            </p>
          </div>
          <div className="flex justify-start w-96">
            <Button
              mt="4"
              size="lg"
              _hover={{ opacity: 0.7 }}
              className="w-full bg-[#EAAC2E] text-white"
              type="submit"
            >
              Acessar conta
            </Button>
          </div>
          <div className="flex justify-start w-96 mt-8">
            <p className="text-base font-normal">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="text-[#EAAC2E]"
                _hover={{ opacity: 0.7 }}
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  )
}
