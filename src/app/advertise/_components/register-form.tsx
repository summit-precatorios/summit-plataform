'use client';

import {
  createAnnouncementSchema,
  type CreateAnnouncementSchema,
} from '@/app/advertise/_schemas/announcement.schema';
import { AnnouncementDetailsSection } from '@/app/advertise/_components/announcement-form/announcement-details-section';
import { DocumentsSection } from '@/app/advertise/_components/announcement-form/documents-section';
import { OwnerSection } from '@/app/advertise/_components/announcement-form/owner-section';
import { PaymentSection } from '@/app/advertise/_components/announcement-form/payment-section';
import { ValuesSection } from '@/app/advertise/_components/announcement-form/values-section';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { currencyFormatter } from '@/lib/utils';
import { createAnnouncementRequest } from '@/services/announcement.service';
import { CreateAnnouncementRequestData, PaymentMethod } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Info,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function handleSalePriceChange(value: string | number): string {
  if (!value) return '';

  const valueStr = String(value);
  const numericValue = /^\d+$/.test(valueStr)
    ? Number(valueStr) / 100
    : Number(
        valueStr.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')
      );

  if (!isNaN(numericValue)) {
    const calculatedBalance = (numericValue * 0.95).toFixed(2); // 95% do valor de venda
    const formattedBalance = currencyFormatter
      .format(Number(calculatedBalance))
      .replace(/^R\$/, '')
      .trim();

    return formattedBalance;
  }

  return '';
}

export function RegisterForm(props: {
  title: string;
  description: string;
  show: boolean;
  announcementType: 'RPV' | 'PRECATORIO';
}) {
  const [salePrice, setSalePrice] = useState('0,00');
  const [documentBankAccount, setDocumentBankAccount] = useState('');
  const [selectedOption, setSelectedOption] = useState<PaymentMethod>('PIX');
  const [formattedPrice, setFormattedPrice] = useState('0,00');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const form = useForm<CreateAnnouncementSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      type: props.announcementType,
      paymentOption: 'PIX',
      ownerFullName: '',
      ownerDocument: '',
      lawSuit: '',
      origin: '',
      court: '',
      price: '',
      salePrice: '',
      liquidBalance: '',
      pixKey: '',
      ownerBankAccount: '',
      documentBankAccount: '',
      bankAccount: '',
      agencyBankAccount: '',
    },
  });

  const handlePaymentReceivingOption = (option: PaymentMethod) => {
    setSelectedOption(option);
    form.setValue('paymentOption', option);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newErrors: string[] = [];
    const validFiles: File[] = [];

    for (const file of Array.from(files)) {
      if (file.type !== 'application/pdf') {
        newErrors.push(`'${file.name}' não é um arquivo PDF válido.`);
        continue;
      }

      // Verifica magic bytes (%PDF-) para rejeitar arquivos renomeados
      const buffer = await file.slice(0, 5).arrayBuffer();
      const header = new TextDecoder().decode(buffer);
      if (!header.startsWith('%PDF-')) {
        newErrors.push(`'${file.name}' não é um arquivo PDF válido.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`'${file.name}' excede o tamanho máximo de 10MB.`);
        continue;
      }

      if (uploadedFiles.some((f) => f.name === file.name && f.size === file.size)) {
        newErrors.push(`'${file.name}' já foi adicionado.`);
        continue;
      }

      validFiles.push(file);
    }

    if (newErrors.length > 0) {
      setFileErrors(newErrors);
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar arquivos',
        description: newErrors.join(' '),
      });
    } else {
      setFileErrors([]);
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast({
        variant: 'default',
        title: `${validFiles.length} arquivo(s) adicionado(s)`,
        description: 'Os documentos foram adicionados com sucesso.',
      });
    }

    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const { toast } = useToast();
  const router = useRouter();

  // Função auxiliar para converter valor monetário para formato PT-BR sem separador de milhar.
  // O backend espera valores com vírgula como separador decimal (ex.: "10000,00").
  const convertCurrencyToNumber = (value: string | undefined): string => {
    if (!value || value.trim() === '') return '';

    // Se for apenas dígitos, considera que está em centavos e converte para decimal PT-BR.
    if (/^\d+$/.test(value)) {
      return (Number(value) / 100).toFixed(2).replace('.', ',');
    }

    // Fallback para valores já formatados no padrão PT-BR (ex.: 10.000,00).
    // Remove apenas os pontos (separadores de milhar), mantém a vírgula decimal.
    return value
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '');
  };

  async function onSubmit(data: CreateAnnouncementSchema) {
    try {
      // Valida se todos os campos obrigatórios estão preenchidos
      if (!data.type && !props.announcementType) {
        toast({
          variant: 'destructive',
          title: 'Erro de validação',
          description: 'O tipo de anúncio é obrigatório',
        });
        return;
      }

      // Garante que o tipo está presente
      const formDataToSend = {
        ...data,
        type: data.type || props.announcementType,
      };

      // Valida campos obrigatórios antes de enviar
      const requiredFields = [
        { key: 'ownerFullName', label: 'Nome completo' },
        { key: 'ownerDocument', label: 'CPF' },
        { key: 'lawSuit', label: 'Número do processo' },
        { key: 'origin', label: 'Origem' },
        { key: 'court', label: 'Tribunal' },
        { key: 'price', label: 'Valor nominal' },
        { key: 'salePrice', label: 'Valor de venda' },
        { key: 'liquidBalance', label: 'Saldo líquido' },
        { key: 'paymentOption', label: 'Forma de pagamento' },
      ];

      const missingFields = requiredFields.filter(
        (field) =>
          !formDataToSend[field.key as keyof typeof formDataToSend] ||
          String(
            formDataToSend[field.key as keyof typeof formDataToSend]
          ).trim() === ''
      );

      if (missingFields.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Campos obrigatórios não preenchidos',
          description: `Por favor, preencha: ${missingFields.map((f) => f.label).join(', ')}`,
        });
        return;
      }

      // Se houver arquivos, prepara FormData, caso contrário envia JSON normal
      let response;

      if (uploadedFiles.length > 0) {
        // Criar FormData para envio de arquivos
        const formData = new FormData();

        // Adiciona todos os campos obrigatórios do formulário
        // Campos obrigatórios sempre presentes
        formData.append('type', formDataToSend.type);
        formData.append('ownerFullName', formDataToSend.ownerFullName);
        formData.append('ownerDocument', formDataToSend.ownerDocument);
        formData.append('lawSuit', formDataToSend.lawSuit);
        formData.append('origin', formDataToSend.origin);
        formData.append('court', formDataToSend.court);

        // Valores monetários - converte para formato numérico
        const price = convertCurrencyToNumber(formDataToSend.price);
        const salePrice = convertCurrencyToNumber(formDataToSend.salePrice);
        const liquidBalance = convertCurrencyToNumber(
          formDataToSend.liquidBalance
        );

        formData.append('price', price);
        formData.append('salePrice', salePrice);
        formData.append('liquidBalance', liquidBalance);

        // Payment option
        formData.append('paymentOption', formDataToSend.paymentOption);

        // Campos condicionais baseados no tipo de pagamento
        if (formDataToSend.paymentOption === 'PIX') {
          if (formDataToSend.pixKey) {
            formData.append('pixKey', formDataToSend.pixKey);
          }
        } else if (formDataToSend.paymentOption === 'TRANSFER_BANK') {
          if (formDataToSend.ownerBankAccount) {
            formData.append(
              'ownerBankAccount',
              formDataToSend.ownerBankAccount
            );
          }
          if (formDataToSend.documentBankAccount) {
            formData.append(
              'documentBankAccount',
              formDataToSend.documentBankAccount
            );
          }
          if (formDataToSend.bankAccount) {
            formData.append('bankAccount', formDataToSend.bankAccount);
          }
          if (formDataToSend.agencyBankAccount) {
            formData.append(
              'agencyBankAccount',
              formDataToSend.agencyBankAccount
            );
          }
        }

        // Adiciona os arquivos PDF
        uploadedFiles.forEach((file, index) => {
          formData.append(`documents[${index}]`, file);
        });

        response = await api.post('announcement', formData);
      } else {
        // Prepara dados para envio JSON - converte valores monetários
        const jsonData: CreateAnnouncementRequestData = {
          type: formDataToSend.type,
          ownerFullName: formDataToSend.ownerFullName,
          ownerDocument: formDataToSend.ownerDocument,
          lawSuit: formDataToSend.lawSuit,
          origin: formDataToSend.origin,
          court: formDataToSend.court,
          price: convertCurrencyToNumber(formDataToSend.price),
          salePrice: convertCurrencyToNumber(formDataToSend.salePrice),
          liquidBalance: convertCurrencyToNumber(formDataToSend.liquidBalance),
          paymentOption: formDataToSend.paymentOption,
        };

        // Adiciona campos condicionais apenas se preenchidos
        if (formDataToSend.paymentOption === 'PIX' && formDataToSend.pixKey) {
          jsonData.pixKey = formDataToSend.pixKey;
        } else if (formDataToSend.paymentOption === 'TRANSFER_BANK') {
          if (formDataToSend.ownerBankAccount) {
            jsonData.ownerBankAccount = formDataToSend.ownerBankAccount;
          }
          if (formDataToSend.documentBankAccount) {
            jsonData.documentBankAccount = formDataToSend.documentBankAccount;
          }
          if (formDataToSend.bankAccount) {
            jsonData.bankAccount = formDataToSend.bankAccount;
          }
          if (formDataToSend.agencyBankAccount) {
            jsonData.agencyBankAccount = formDataToSend.agencyBankAccount;
          }
        }

        // Envia normalmente sem arquivos
        response = await createAnnouncementRequest(jsonData);
      }

      if (!response) {
        toast({
          variant: 'destructive',
          title: 'Erro interno',
          description: 'Não foi possível processar a sua requisição',
        });
        return;
      }

      const res = response as { statusCode?: number; message?: string | string[]; error?: string };
      if (res.statusCode === 201 || !res.statusCode) {
        toast({
          variant: 'default',
          title: `Seu ${props.title} foi registrado com sucesso!`,
          description:
            'Encaminhamos para o seu email os detalhes sobre o seu anúncio',
        });

        form.reset();
        setUploadedFiles([]);
        setFileErrors([]);
        router.push('/dashboard');
      } else {
        const errorMessage = Array.isArray(res.message)
          ? res.message.join('. ')
          : res.message || 'Não foi possível processar a sua requisição';

        toast({
          variant: 'destructive',
          title: 'Erro ao criar anúncio',
          description: errorMessage,
        });
      }
    } catch (error) {
      // Melhora o tratamento de erros para mostrar mensagens mais específicas
      let errorMessage = 'Não foi possível processar a sua requisição';

      if (error && typeof error === 'object') {
        const errorWithStatus = error as {
          status?: number;
          statusCode?: number;
          message?: string | string[];
          body?: { message?: string | string[] };
        };
        const statusCode = errorWithStatus.statusCode ?? errorWithStatus.status;
        const message = errorWithStatus.body?.message ?? errorWithStatus.message;

        if (statusCode === 400) {
          if (Array.isArray(message)) {
            errorMessage = `Erro de validação: ${message.join('. ')}`;
          } else if (typeof message === 'string') {
            errorMessage = `Erro de validação: ${message}`;
          }
        } else if (message) {
          errorMessage = Array.isArray(message) ? message.join('. ') : message;
        }
      }

      toast({
        variant: 'destructive',
        title: 'Erro ao criar anúncio',
        description: errorMessage,
      });
    }
  }

  const calculatedBalance = handleSalePriceChange(form.watch('salePrice'));

  useEffect(() => {
    form.setValue('liquidBalance', calculatedBalance);
  }, [calculatedBalance, form]);

  useEffect(() => {
    const newCalculatedBalance = handleSalePriceChange(salePrice);
    form.setValue('liquidBalance', newCalculatedBalance);
  }, [salePrice, form]);

  // Garante que o tipo está sempre definido
  useEffect(() => {
    if (props.announcementType) {
      form.setValue('type', props.announcementType);
    }
  }, [props.announcementType, form]);

  if (!props.show) {
    return null;
  }

  return (
    <div className='w-full space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Section 1: Dados do Proprietário */}
          <OwnerSection form={form} />

          {/* Section 2: Informações do Precatório */}
          <AnnouncementDetailsSection form={form} title={props.title} />

          {/* Section 3: Valores */}
          <ValuesSection
            form={form}
            title={props.title}
            formattedPrice={formattedPrice}
            setFormattedPrice={setFormattedPrice}
            salePrice={salePrice}
            setSalePrice={setSalePrice}
          />

          {/* Section 4: Dados para Recebimento */}
          <PaymentSection
            form={form}
            selectedOption={selectedOption}
            onSelectOption={handlePaymentReceivingOption}
            documentBankAccount={documentBankAccount}
            setDocumentBankAccount={setDocumentBankAccount}
          />

          {/* Section 5: Documentos */}
          <DocumentsSection
            uploadedFiles={uploadedFiles}
            fileErrors={fileErrors}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            formatFileSize={formatFileSize}
          />

          {/* Submit Button */}
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between pt-4'>
            <div className='text-sm text-gray-600 flex items-center gap-2'>
              <Info className='h-4 w-4' />
              <span>
                Ao enviar, você concorda com nossos{' '}
                <a href='/terms' className='text-brand hover:underline'>
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href='/privacy' className='text-brand hover:underline'>
                  Política de Privacidade
                </a>
              </span>
            </div>
            <Button
              type='submit'
              className='w-full sm:w-auto min-w-[200px] h-12 text-base font-semibold'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Registrando...
                </>
              ) : (
                'Registrar Anúncio'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
