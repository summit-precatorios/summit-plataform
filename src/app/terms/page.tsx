import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Serviço | Summit',
  description: 'Leia os termos de serviço da plataforma Summit.',
};

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-white px-6 py-24 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='flex justify-center mb-6'>
            <div className='rounded-full bg-brand/10 p-4'>
              <FileText className='h-12 w-12 text-brand' />
            </div>
          </div>
          <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Termos de Serviço
          </h1>
          <p className='mt-6 text-xl leading-8 text-gray-600'>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className='px-6 py-24 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <Card className='border-2 shadow-lg'>
            <CardContent className='p-8 md:p-12'>
              <div className='prose prose-lg max-w-none space-y-8'>
                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    1. Aceitação dos Termos
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Ao acessar e usar a plataforma Summit, você concorda em
                    cumprir e estar vinculado a estes Termos de Serviço. Se você
                    não concordar com qualquer parte destes termos, não deve
                    usar nossa plataforma.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    2. Descrição do Serviço
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    A Summit é uma plataforma digital que facilita a negociação
                    de precatórios e RPVs (Requisições de Pequeno Valor),
                    conectando vendedores e investidores. Nossos serviços
                    incluem:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>Plataforma para cadastro e anúncio de precatórios</li>
                    <li>
                      Ferramentas de busca e filtragem de precatórios
                      disponíveis
                    </li>
                    <li>
                      Sistema de comunicação entre vendedores e compradores
                    </li>
                    <li>Processo de validação e documentação de transações</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    3. Cadastro e Conta do Usuário
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Para usar nossos serviços, você precisa:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>
                      Criar uma conta fornecendo informações verdadeiras,
                      precisas e completas
                    </li>
                    <li>Manter e atualizar suas informações pessoais</li>
                    <li>Ser responsável pela segurança de sua conta e senha</li>
                    <li>
                      Notificar-nos imediatamente sobre qualquer uso não
                      autorizado de sua conta
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    4. Responsabilidades do Usuário
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Você concorda em:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>
                      Usar a plataforma apenas para fins legais e de acordo com
                      estes termos
                    </li>
                    <li>
                      Fornecer informações verdadeiras e precisas sobre seus
                      precatórios
                    </li>
                    <li>
                      Não usar a plataforma para atividades fraudulentas ou
                      ilegais
                    </li>
                    <li>Respeitar os direitos de outros usuários</li>
                    <li>
                      Não interferir ou perturbar o funcionamento da plataforma
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    5. Taxas e Pagamentos
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    O uso da plataforma é gratuito. Aplicamos taxas apenas sobre
                    transações bem-sucedidas, que serão claramente informadas
                    antes da confirmação da negociação. Todas as taxas são
                    calculadas com base no valor da transação e são
                    transparentes para ambas as partes.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    6. Limitação de Responsabilidade
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    A Summit atua como intermediária na negociação de
                    precatórios. Não somos responsáveis por:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>
                      A veracidade das informações fornecidas pelos usuários
                    </li>
                    <li>
                      O cumprimento de obrigações entre compradores e vendedores
                    </li>
                    <li>
                      Decisões judiciais ou administrativas que afetem os
                      precatórios
                    </li>
                    <li>
                      Perdas ou danos decorrentes do uso ou impossibilidade de
                      uso da plataforma
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    7. Propriedade Intelectual
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Todo o conteúdo da plataforma, incluindo textos, gráficos,
                    logotipos, ícones, imagens e software, é propriedade da
                    Summit ou de seus fornecedores de conteúdo e está protegido
                    por leis de direitos autorais e outras leis de propriedade
                    intelectual.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    8. Modificações dos Termos
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Reservamo-nos o direito de modificar estes Termos de Serviço
                    a qualquer momento. As alterações entrarão em vigor
                    imediatamente após a publicação. É sua responsabilidade
                    revisar periodicamente estes termos.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    9. Rescisão
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Podemos suspender ou encerrar sua conta a qualquer momento,
                    sem aviso prévio, por violação destes Termos de Serviço ou
                    por qualquer outro motivo que consideremos apropriado.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    10. Lei Aplicável
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Estes Termos de Serviço são regidos pelas leis brasileiras.
                    Qualquer disputa será resolvida nos tribunais competentes do
                    Brasil.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    11. Contato
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Se você tiver dúvidas sobre estes Termos de Serviço, entre
                    em contato conosco através da página de em contato conosco
                    através da página de{' '}
                    <a
                      href='/contact'
                      className='text-brand hover:underline'
                    >
                      contato
                    </a>
                    .
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
