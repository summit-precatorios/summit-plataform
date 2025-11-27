'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AuthContext } from '@/contexts/AuthContext';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  FileText,
  Lock,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

const benefits = [
  {
    icon: Shield,
    title: 'Segurança Garantida',
    description:
      'Transações seguras e protegidas com tecnologia de ponta e criptografia avançada.',
  },
  {
    icon: Zap,
    title: 'Processo Rápido',
    description:
      'Negocie seus precatórios de forma ágil e eficiente, sem burocracias desnecessárias.',
  },
  {
    icon: TrendingUp,
    title: 'Melhores Ofertas',
    description:
      'Acesse uma rede de investidores qualificados e obtenha as melhores condições de mercado.',
  },
  {
    icon: Users,
    title: 'Suporte Especializado',
    description:
      'Conte com nossa equipe experiente para te auxiliar em cada etapa do processo.',
  },
  {
    icon: Lock,
    title: 'Dados Protegidos',
    description:
      'Suas informações pessoais e financeiras estão totalmente protegidas e sigilosas.',
  },
  {
    icon: FileText,
    title: 'Documentação Simplificada',
    description:
      'Processo de registro e validação de documentos de forma simples e descomplicada.',
  },
];

const features = [
  {
    icon: DollarSign,
    title: 'RPVs e Precatórios',
    description:
      'Negocie Requisições de Pequeno Valor (RPVs) e Precatórios de forma transparente e segura.',
  },
  {
    icon: CheckCircle2,
    title: 'Validação Automática',
    description:
      'Sistema inteligente que valida automaticamente seus documentos e acelera o processo.',
  },
  {
    icon: Users,
    title: 'Rede de Investidores',
    description:
      'Conecte-se com investidores qualificados interessados em adquirir seus precatórios.',
  },
];

export default function Page() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#EAAC2E] to-[#ffc947] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                width={250}
                height={250}
                alt="Summit logo"
                className="inline-block object-contain"
                priority
                quality={100}
              />
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              A maneira mais <span className="text-[#EAAC2E]">simples</span> de
              negociar
              <br />
              seus precatórios
            </h1>

            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Plataforma completa para localizar, adquirir ou vender seus RPVs e
              Precatórios. Transparência, segurança e agilidade em um único
              lugar.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap gap-y-4">
              {!isAuthenticated && (
                <>
                  <Button asChild size="lg" className="h-14 px-8 text-lg">
                    <Link href="/register">
                      Criar conta gratuita
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-lg"
                  >
                    <Link href="/sign-in">Já tenho uma conta</Link>
                  </Button>
                </>
              )}

              {isAuthenticated && (
                <Button asChild size="lg" className="h-14 px-8 text-lg">
                  <Link href="/dashboard">
                    Acessar Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="rounded-full bg-[#EAAC2E]/10 p-4 mb-4">
                      <Icon className="h-8 w-8 text-[#EAAC2E]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 max-w-xs">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Por que escolher a Summit?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Oferecemos tudo que você precisa para negociar precatórios com
              segurança e confiança
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-[#EAAC2E] transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="rounded-lg bg-[#EAAC2E]/10 w-12 h-12 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#EAAC2E]" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#EAAC2E] to-[#ffc947] py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pronto para começar?
          </h2>
          <p className="mt-6 text-xl leading-8 text-white/90">
            Junte-se a centenas de pessoas que já estão negociando seus
            precatórios de forma segura e eficiente.
          </p>
          {!isAuthenticated && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg"
              >
                <Link href="/register">
                  Criar conta gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Summit. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
