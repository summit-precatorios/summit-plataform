import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Summit',
  description: 'Saiba como a Summit trata e protege seus dados.',
};

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-white px-6 py-24 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='flex justify-center mb-6'>
            <div className='rounded-full bg-brand/10 p-4'>
              <Shield className='h-12 w-12 text-brand' />
            </div>
          </div>
          <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Política de Privacidade
          </h1>
          <p className='mt-6 text-xl leading-8 text-gray-600'>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className='px-6 py-24 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <Card className='border-2 shadow-lg'>
            <CardContent className='p-8 md:p-12'>
              <div className='prose prose-lg max-w-none space-y-8'>
                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    1. Introdução
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    A Summit está comprometida em proteger sua privacidade e
                    garantir a segurança de seus dados pessoais. Esta Política
                    de Privacidade descreve como coletamos, usamos, armazenamos
                    e protegemos suas informações pessoais quando você usa nossa
                    plataforma.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    2. Informações que Coletamos
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Coletamos os seguintes tipos de informações:
                  </p>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        2.1. Informações Fornecidas por Você
                      </h3>
                      <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                        <li>Nome completo</li>
                        <li>CPF</li>
                        <li>Endereço de e-mail</li>
                        <li>Número de telefone (opcional)</li>
                        <li>Informações bancárias para pagamento</li>
                        <li>Documentos relacionados aos precatórios</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        2.2. Informações Coletadas Automaticamente
                      </h3>
                      <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                        <li>Endereço IP</li>
                        <li>Tipo de navegador</li>
                        <li>Páginas visitadas</li>
                        <li>Data e hora de acesso</li>
                        <li>Cookies e tecnologias similares</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    3. Como Usamos Suas Informações
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Usamos suas informações para:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>
                      Fornecer e melhorar nossos serviços de negociação de
                      precatórios
                    </li>
                    <li>Processar transações e gerenciar sua conta</li>
                    <li>
                      Comunicar-nos com você sobre sua conta e nossas transações
                    </li>
                    <li>Verificar sua identidade e prevenir fraudes</li>
                    <li>
                      Enviar comunicações importantes sobre nossos serviços
                    </li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>Analisar o uso da plataforma para melhorias</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    4. Compartilhamento de Informações
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Não vendemos suas informações pessoais. Compartilhamos suas
                    informações apenas nas seguintes situações:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>
                      Com outros usuários da plataforma quando necessário para
                      completar uma transação (apenas informações necessárias)
                    </li>
                    <li>
                      Com prestadores de serviços que nos ajudam a operar a
                      plataforma (sob contratos de confidencialidade)
                    </li>
                    <li>
                      Quando exigido por lei ou por autoridades competentes
                    </li>
                    <li>Para proteger nossos direitos e prevenir fraudes</li>
                    <li>Com seu consentimento explícito</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    5. Segurança dos Dados
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Implementamos medidas de segurança técnicas e
                    organizacionais para proteger suas informações pessoais
                    contra acesso não autorizado, alteração, divulgação ou
                    destruição. Isso inclui criptografia de dados, controles de
                    acesso e monitoramento regular de nossos sistemas.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    6. Cookies e Tecnologias Similares
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Utilizamos cookies e tecnologias similares para:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>Manter você conectado à sua conta</li>
                    <li>Lembrar suas preferências</li>
                    <li>Analisar como você usa nossa plataforma</li>
                    <li>Melhorar a funcionalidade do site</li>
                  </ul>
                  <p className='text-gray-700 leading-relaxed mt-4'>
                    Você pode controlar o uso de cookies através das
                    configurações do seu navegador.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    7. Seus Direitos
                  </h2>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    De acordo com a LGPD (Lei Geral de Proteção de Dados), você
                    tem direito a:
                  </p>
                  <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                    <li>Confirmar a existência de tratamento de seus dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>
                      Corrigir dados incompletos, inexatos ou desatualizados
                    </li>
                    <li>
                      Solicitar a anonimização, bloqueio ou eliminação de dados
                    </li>
                    <li>Solicitar a portabilidade dos dados</li>
                    <li>Revogar seu consentimento</li>
                    <li>Informar-se sobre o compartilhamento de seus dados</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    8. Retenção de Dados
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Mantemos suas informações pessoais apenas pelo tempo
                    necessário para cumprir os propósitos descritos nesta
                    política, a menos que um período de retenção mais longo seja
                    exigido ou permitido por lei. Após esse período, excluímos
                    ou anonimizamos seus dados de forma segura.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    9. Menores de Idade
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Nossa plataforma não é destinada a menores de 18 anos. Não
                    coletamos intencionalmente informações pessoais de menores.
                    Se tomarmos conhecimento de que coletamos informações de um
                    menor, tomaremos medidas para excluir essas informações
                    imediatamente.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    10. Alterações nesta Política
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Podemos atualizar esta Política de Privacidade
                    periodicamente. Notificaremos você sobre mudanças
                    significativas publicando a nova política em nossa
                    plataforma e atualizando a data de &quot;Última
                    atualização&quot;. Recomendamos que você revise esta
                    política regularmente.
                  </p>
                </section>

                <section>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    11. Contato
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    Se você tiver dúvidas sobre esta Política de Privacidade ou
                    sobre o tratamento de seus dados pessoais, entre em contato
                    conosco através da página de{' '}
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
