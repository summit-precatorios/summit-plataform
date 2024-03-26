'use client'

import Container from '@/components/Container'
import styles from './styles.module.scss'
import React from 'react'
import InputGroup from '@/components/InputGroup'
import PasswordInput from '@/components/PasswordInput'
import { Button, Link } from '@chakra-ui/react'

export default function Signin() {
  return (
    <>
      <Container>
        <div className={styles.main_content}>
          <div className="flex justify-start mb-8 w-96">
            <h1 className="text-4xl font-semibold">Entrar</h1>
          </div>
          <InputGroup
            label="CPF"
            htmlFor="document"
            inputType="text"
            placeholder="Informe o seu cpf"
            inputName="document"
            inputId="document"
          />
          <PasswordInput
            htmlFor="password"
            inputId="password"
            inputName="password"
            inputType="password"
            label="Senha"
            placeholder="Digite sua senha"
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
              _hover={{ opacity: 0.7 }}
              className="w-full bg-[#EAAC2E] text-white"
            >
              Acessar conta
            </Button>
          </div>
          <div className="flex justify-start w-96 mt-8">
            <p className="text-base font-normal">
              Não tem uma conta?{' '}
              <Link className="text-[#EAAC2E]" _hover={{ opacity: 0.7 }}>
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
