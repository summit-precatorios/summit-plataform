'use client'

import Container from '@/components/Container'
import styles from './styles.module.scss'
import React from 'react'
import InputGroup from '@/components/InputGroup'
import { Visibility } from '@mui/icons-material'

export default function Signin() {
  return (
    <>
      <Container>
        <h1 className="text-4xl font-semibold">Entrar</h1>

        <div className={styles.main_content}>
          <InputGroup
            label="CPF"
            htmlFor="document"
            inputType="text"
            placeholder="Informe o seu cpf"
            inputName="document"
            inputId="document"
          />
          <InputGroup
            label="Senha"
            htmlFor="password"
            inputType="password"
            placeholder="Digite sua senha"
            inputName="password"
            inputId="password"
          />
          <span>
            <Visibility />
          </span>
        </div>
      </Container>
    </>
  )
}
