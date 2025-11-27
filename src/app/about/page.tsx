'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Shield,
    title: 'Segurança',
    description:
      'Priorizamos a segurança de todas as transações e dados dos nossos usuários com tecnologia de ponta.',
  },
  {
    icon: Zap,
    title: 'Agilidade',
    description:
      'Processos simplificados para que você negocie seus precatórios de forma rápida e eficiente.',
  },
  {
    icon: TrendingUp,
    title: 'Transparência',
    description:
      'Todas as informações são claras e transparentes, sem surpresas ou taxas ocultas.',
  },
  {
    icon: Users,
    title: 'Confiança',
    description:
      'Uma plataforma confiável que conecta investidores e vendedores com segurança e credibilidade.',
  },
]

const timeline = [
  {
    year: '2024',
    title: 'Fundação',
    description:
      'Summit foi criada com a missão de democratizar o acesso à negociação de precatórios no Brasil.',
  },
  {
    year: '2024',
    title: 'Lançamento da Plataforma',
    description:
      'Plataforma digital completa para negociação de RPVs e Precatórios entra em funcionamento.',
  },
  {
    year: '2024',
    title: 'Crescimento',
    description:
      'Centenas de usuários já confiam na Summit para suas negociações de precatórios.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Sobre a Summit
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Somos uma plataforma inovadora dedicada a facilitar a negociação de
            precatórios e RPVs, conectando vendedores e investidores de forma
            segura e transparente.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Nossa Missão
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Democratizar o acesso à negociação de precatórios, oferecendo
                uma plataforma segura, transparente e fácil de usar para todos
                os brasileiros que desejam negociar seus direitos de forma
                eficiente.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Acreditamos que todos têm o direito de acessar o valor de seus
                precatórios de forma justa e rápida, sem burocracias
                desnecessárias.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Nossa Visão
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Ser a principal referência em negociação de precatórios no
                Brasil, reconhecida pela confiança, segurança e excelência no
                atendimento aos nossos usuários.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Queremos transformar a forma como os precatórios são negociados,
                tornando o processo mais acessível, rápido e transparente para
                todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Nossos Valores
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Os princípios que guiam tudo que fazemos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="border-2 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="rounded-lg bg-[#EAAC2E]/10 w-12 h-12 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#EAAC2E]" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Nossa História
            </h2>
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-[#EAAC2E]"
              >
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-[#EAAC2E]"></div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-[#EAAC2E]">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#EAAC2E] to-[#ffc947] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Faça parte da nossa jornada
          </h2>
          <p className="mt-6 text-xl leading-8 text-white/90">
            Junte-se a centenas de pessoas que já estão negociando seus
            precatórios com segurança e agilidade.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[#EAAC2E] shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Criar conta gratuita
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold text-white hover:text-white/80"
            >
              Fale conosco <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
