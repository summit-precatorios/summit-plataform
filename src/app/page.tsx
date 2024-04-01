import Container from '@/components/Container'
import { Button } from '@chakra-ui/react'

export default function Page() {
  return (
    <>
      <Container>
        <h1 className="text-3xl mb-12">Olá Summiters!</h1>
        <p className="mb-12">
          Bem-vindo à nossa página de boas-vindas. Esperamos que você esteja
          tendo um ótimo dia!
        </p>
        <Button>Criar minha conta</Button>
      </Container>
    </>
  )
}
