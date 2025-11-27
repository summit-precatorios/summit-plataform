'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { HelpCircle, Search } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    category: 'Geral',
    questions: [
      {
        question: 'O que é a Summit?',
        answer:
          'A Summit é uma plataforma digital especializada na negociação de precatórios e RPVs (Requisições de Pequeno Valor). Conectamos vendedores que desejam negociar seus precatórios com investidores qualificados, de forma segura e transparente.',
      },
      {
        question: 'Como funciona a plataforma?',
        answer:
          'Após criar sua conta, você pode cadastrar seus precatórios para venda ou buscar precatórios disponíveis para compra. A plataforma facilita todo o processo de negociação, desde o cadastro até a finalização da transação.',
      },
      {
        question: 'É seguro negociar na Summit?',
        answer:
          'Sim, a segurança é nossa prioridade. Utilizamos tecnologia de criptografia avançada para proteger todos os dados e transações. Além disso, todas as negociações seguem processos rigorosos de validação e documentação.',
      },
      {
        question: 'Quanto custa usar a plataforma?',
        answer:
          'O cadastro e uso básico da plataforma são gratuitos. Aplicamos uma taxa apenas sobre transações bem-sucedidas, que é informada claramente antes da confirmação da negociação.',
      },
    ],
  },
  {
    category: 'Cadastro e Conta',
    questions: [
      {
        question: 'Como criar uma conta?',
        answer:
          'Clique em "Criar conta" no menu superior, preencha seus dados pessoais, CPF, e-mail e crie uma senha. Após o cadastro, você receberá um e-mail de confirmação para ativar sua conta.',
      },
      {
        question: 'Preciso validar minha conta?',
        answer:
          'Sim, é necessário validar sua conta através do link enviado por e-mail após o cadastro. Isso garante a segurança e veracidade dos dados cadastrados.',
      },
      {
        question: 'Esqueci minha senha. Como recuperar?',
        answer:
          'Na página de login, clique em "Esqueceu sua senha?" e informe seu e-mail cadastrado. Você receberá um link para redefinir sua senha.',
      },
      {
        question: 'Posso ter mais de uma conta?',
        answer:
          'Não, cada CPF pode ter apenas uma conta cadastrada. Isso garante a segurança e integridade da plataforma.',
      },
    ],
  },
  {
    category: 'Negociação',
    questions: [
      {
        question: 'Como anunciar meu precatório?',
        answer:
          'Após fazer login, acesse "Anunciar" e preencha todas as informações solicitadas sobre seu precatório, incluindo número do processo, origem, tribunal e valor desejado.',
      },
      {
        question: 'Quanto tempo leva para vender meu precatório?',
        answer:
          'O tempo varia conforme a demanda do mercado e as condições oferecidas. Precatórios com valores e condições mais atrativas tendem a ser negociados mais rapidamente.',
      },
      {
        question: 'Como recebo o pagamento?',
        answer:
          'Você pode escolher receber via PIX ou transferência bancária. Os dados bancários devem ser informados no momento do cadastro do anúncio.',
      },
      {
        question: 'Há algum valor mínimo para negociar?',
        answer:
          'Não há valor mínimo estabelecido. Você pode negociar precatórios de qualquer valor, desde RPVs até precatórios de valores maiores.',
      },
    ],
  },
  {
    category: 'Investimento',
    questions: [
      {
        question: 'Como investir em precatórios?',
        answer:
          'Investidores qualificados podem navegar pela plataforma, visualizar os precatórios disponíveis e fazer ofertas aos vendedores. Todas as informações necessárias para análise estão disponíveis no anúncio.',
      },
      {
        question: 'Quais documentos preciso para investir?',
        answer:
          'Investidores precisam estar com a conta validada e podem precisar fornecer documentação adicional conforme a regulamentação aplicável.',
      },
      {
        question: 'Como são calculados os rendimentos?',
        answer:
          'Os rendimentos dependem da diferença entre o valor de compra e o valor que o precatório será recebido do órgão público. A plataforma oferece ferramentas para análise e simulação.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[#EAAC2E]/10 p-4">
              <HelpCircle className="h-12 w-12 text-[#EAAC2E]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Perguntas Frequentes
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre nossa
            plataforma
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Buscar perguntas..."
              className="pl-10 h-14 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Nenhuma pergunta encontrada com &quot;{searchTerm}&quot;. Tente
                buscar com outras palavras.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${categoryIndex}-${index}`}
                        className="border-2 rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-semibold hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#EAAC2E] to-[#ffc947] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Ainda tem dúvidas?
          </h2>
          <p className="mt-6 text-xl leading-8 text-white/90">
            Entre em contato conosco e nossa equipe estará pronta para ajudar
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[#EAAC2E] shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
