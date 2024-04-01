'use client'
import Container from '@/components/Container'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Container>
        <h1 className="text-3xl mb-12">Olá Summiters!</h1>
        <p className="mb-12">
          Bem-vindo à nossa página de boas-vindas. Esperamos que você esteja
          tendo um ótimo dia!
        </p>
        <Link href={'/register'}>
          <Button
            size="lg"
            width={'auto'}
            background={'#EAAC2E'}
            color={'white'}
            _focus={{ background: '#EAAC2E' }}
            _hover={{ opacity: 0.7 }}
            type="submit"
          >
            Criar minha conta
          </Button>
        </Link>
      </Container>
    </>
  )
}
