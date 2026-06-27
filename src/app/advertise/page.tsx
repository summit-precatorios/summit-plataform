'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, CheckCircle2, FileText, Info, Scale } from 'lucide-react';
import { useState } from 'react';
import { RegisterForm } from './_components/register-form';

type AnnouncementLabel = 'RPV' | 'PRECATORIO';

type AnnouncementType = {
  label: AnnouncementLabel | null;
  isActive: boolean;
  description: string;
};

const announcementTypes = [
  {
    label: 'RPV' as AnnouncementLabel,
    title: 'RPV',
    subtitle: 'Requisição de Pequeno Valor',
    description: 'Créditos de até 30 salários mínimos',
    icon: Scale,
    details: [
      'Prazo de pagamento geralmente mais curto',
      'Processo menos burocrático',
      'Percentual de deságio costuma ser menor',
    ],
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
    borderColor: 'border-blue-300',
    selectedBorder: 'border-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'PRECATORIO' as AnnouncementLabel,
    title: 'Precatório',
    subtitle: 'Crédito Judicial Federal ou Estadual',
    description: 'Créditos acima de 30 salários mínimos',
    icon: FileText,
    details: [
      'Valores nominais geralmente mais elevados',
      'Ampla aceitação no mercado secundário',
      'Diversas origens e modalidades disponíveis',
    ],
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600',
    borderColor: 'border-emerald-300',
    selectedBorder: 'border-emerald-500',
    bgColor: 'bg-emerald-50',
  },
];

export default function AdvertisePage() {
  const [announcementType, setAnnouncementType] = useState<AnnouncementType>({
    description: '',
    isActive: false,
    label: null,
  });

  const selectedType = announcementTypes.find(
    (t) => t.label === announcementType.label,
  );

  function handleSelect(label: AnnouncementLabel) {
    const type = announcementTypes.find((t) => t.label === label)!;
    setAnnouncementType((prev) => ({
      ...prev,
      label,
      description: type.description,
    }));
  }

  function handleConfirm() {
    setAnnouncementType((prev) => ({ ...prev, isActive: true }));
    setTimeout(() => {
      document
        .getElementById('announcement-form')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function handleBack() {
    setAnnouncementType({ description: '', isActive: false, label: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4'>
            {announcementType.isActive && selectedType
              ? `Anuncie seu ${selectedType.title}`
              : 'Anuncie seu crédito judicial'}
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto'>
            {announcementType.isActive
              ? `Preencha as informações abaixo para anunciar seu ${selectedType?.title}.`
              : 'Selecione o tipo de crédito judicial que você possui para continuar.'}
          </p>
        </div>

        {/* Selection Cards */}
        {!announcementType.isActive && (
          <>
            <div className='grid gap-6 sm:grid-cols-2 mb-8'>
              {announcementTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = announcementType.label === type.label;

                return (
                  <Card
                    key={type.label}
                    role='button'
                    aria-pressed={isSelected}
                    className={`cursor-pointer transition-all duration-200 border-2 ${
                      isSelected
                        ? `${type.bgColor} ${type.selectedBorder} shadow-md`
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                    }`}
                    onClick={() => handleSelect(type.label)}
                  >
                    <CardHeader>
                      <div className='flex items-center justify-between mb-3'>
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${type.gradientFrom} ${type.gradientTo} text-white`}
                        >
                          <Icon className='h-6 w-6' />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className='h-6 w-6 text-green-500' />
                        )}
                      </div>
                      <CardTitle className='text-xl sm:text-2xl'>
                        {type.title}
                      </CardTitle>
                      <CardDescription className='text-sm'>
                        {type.subtitle}
                      </CardDescription>
                      <p className='text-base text-gray-700 mt-1'>
                        {type.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className='space-y-2'>
                        {type.details.map((detail, i) => (
                          <li key={i} className='flex items-start gap-2'>
                            <span className='text-gray-400 mt-0.5 select-none'>
                              •
                            </span>
                            <span className='text-sm text-gray-600'>
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Confirm CTA — only shown after user actively selects a card */}
            <div
              className={`text-center transition-all duration-200 mb-12 ${
                announcementType.label
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 pointer-events-none translate-y-2'
              }`}
            >
              <button
                onClick={handleConfirm}
                disabled={!announcementType.label}
                className='inline-flex items-center gap-2 px-8 py-3 bg-brand text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed'
              >
                Continuar com {selectedType?.title ?? ''}
                <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          </>
        )}

        {/* Info Banner */}
        {announcementType.isActive && selectedType && (
          <Card
            className={`mb-8 border-2 ${selectedType.borderColor} ${selectedType.bgColor}`}
          >
            <CardContent className='pt-6'>
              <div className='flex items-start gap-3'>
                <Info className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900 mb-1'>
                    Informações importantes
                  </p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>
                      • Todos os campos são obrigatórios para garantir a
                      segurança da transação
                    </li>
                    <li>
                      • O valor líquido é calculado automaticamente (95% do
                      valor de venda)
                    </li>
                    <li>
                      • Você receberá um e-mail de confirmação após o registro
                    </li>
                    <li>• Seus dados estão protegidos e seguros</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <div id='announcement-form'>
          <RegisterForm
            announcementType={announcementType.label ?? 'PRECATORIO'}
            title={announcementType.label === 'RPV' ? 'RPV' : 'Precatório'}
            description={
              announcementType.isActive
                ? `Preencha todas as informações para anunciar seu ${announcementType.label === 'RPV' ? 'RPV' : 'precatório'}`
                : ''
            }
            show={announcementType.isActive}
          />
        </div>

        {/* Back */}
        {announcementType.isActive && (
          <div className='mt-8 text-center'>
            <button
              onClick={handleBack}
              className='text-sm text-gray-600 hover:text-gray-900 underline transition-colors'
            >
              ← Voltar para seleção de tipo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
