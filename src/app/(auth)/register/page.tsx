'use client'

import InputGroup from '@/components/InputGroup'
import PasswordInput from '@/components/PasswordInput'
import { validate } from '@/utils/validate'
import { Button, Link, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const registerUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  document: z.string().refine((value) => validate(value), {
    message: 'Por favor, informe um CPF válido.',
  }),
  password: z.string().min(8, 'Sua senha precisa de no mínimo 8 caracteres'),
})

export default function Page() {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  })

  async function registerUser(data: unknown) {
    try {
      const response = await fetch('http://localhost:4004/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, null, 2),
      })

      if (response.status === 201)
        return toast({
          title: 'Cadastro',
          status: 'success',
          description: 'Sua conta foi criada com sucesso',
          isClosable: true,
        })
    } catch (e) {
      toast({
        title: 'Serviço Indisponível',
        status: 'error',
        description: e.message,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(registerUser)}
      >
        <div className="flex justify-start mb-8 w-96">
          <h1 className="text-4xl font-semibold">Criar conta</h1>
        </div>
        <InputGroup
          label="Nome completo"
          htmlFor="fullName"
          inputId="fullName"
          inputName="fullName"
          inputType="text"
          placeholder="Ex: Seu Nome Completo"
          register={register}
        />

        <InputGroup
          label="E-mail"
          htmlFor="email"
          inputId="email"
          inputName="email"
          inputType="email"
          placeholder="Informe o seu email"
          register={register}
        />
        <InputGroup
          label="CPF"
          htmlFor="document"
          inputId="document"
          inputName="document"
          inputType="text"
          placeholder="Informe o seu CPF"
          register={register}
        />

        {errors && (
          <span className="text-red-400 text-base">
            {errors.document?.message}
          </span>
        )}

        <PasswordInput
          label="Senha"
          htmlFor="password"
          inputId="password"
          inputName="password"
          inputType="password"
          placeholder="Digite sua senha"
          register={register}
        />
        {errors && (
          <span className="text-red-400 text-base">
            {errors.password?.message}
          </span>
        )}
        <div className="flex justify-start w-96">
          <Button
            mt="4"
            size="lg"
            _hover={{ opacity: 0.7 }}
            className="w-full bg-[#EAAC2E] text-white"
            type="submit"
          >
            Criar conta
          </Button>
        </div>
        <div className="flex justify-center w-96 mb-8">
          <Link
            href="/signin"
            className="text-black font-medium no-underline hover:text-[#EAAC2E]"
          >
            Voltar
          </Link>
        </div>
      </form>
    </>
  )
}
