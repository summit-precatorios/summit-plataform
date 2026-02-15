import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ToastAction, type ToastActionElement } from '@/components/ui/toast';
import Link from 'next/link';

export interface ApiError {
  message?: string;
  statusCode?: number;
  status?: number;
  error?: string;
}

export interface ErrorToastOptions {
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
}

export const SupportActionElement: ToastActionElement = React.createElement(
  ToastAction,
  { altText: 'Ir para suporte', asChild: true },
  React.createElement(
    Link,
    { href: '/contact', className: 'border-0 text-black' },
    React.createElement(
      Button,
      { variant: 'outline', size: 'sm' },
      'Contatar Suporte'
    )
  )
) as unknown as ToastActionElement;

/**
 * Trata erros de API e retorna configuração para toast
 */
export function handleApiError(error: unknown): ErrorToastOptions {
  // Se o erro já tem a estrutura de ApiError
  if (
    error &&
    typeof error === 'object' &&
    ('statusCode' in error || 'status' in error)
  ) {
    const apiError = error as ApiError;
    const statusCode = apiError.statusCode || apiError.status || 500;

    switch (statusCode) {
      case 400:
        return {
          variant: 'destructive',
          title: 'Erro na requisição',
          description:
            'Não foi possível processar sua requisição. Verifique os dados informados ou entre em contato com o suporte.',
          action: SupportActionElement,
        };

      case 401:
        return {
          variant: 'destructive',
          title: 'Credenciais inválidas',
          description:
            'O CPF ou senha informados estão incorretos. Verifique suas credenciais e tente novamente.',
        };

      case 403:
        return {
          variant: 'destructive',
          title: 'Acesso negado',
          description:
            'Você não tem permissão para realizar esta ação. Entre em contato com o suporte se acredita que isto é um erro.',
          action: SupportActionElement,
        };

      case 404:
        return {
          variant: 'destructive',
          title: 'Não encontrado',
          description:
            'O recurso solicitado não foi encontrado. Verifique se a URL está correta.',
        };

      case 409:
        return {
          variant: 'default',
          title: 'Não foi possível concluir o cadastro',
          description:
            'Não foi possível processar sua solicitação. Se você já possui uma conta, faça login ou recupere sua senha.',
        };

      case 422:
        return {
          variant: 'destructive',
          title: 'Dados inválidos',
          description:
            apiError.message ||
            'Os dados informados não são válidos. Verifique e tente novamente.',
        };

      case 429:
        return {
          variant: 'destructive',
          title: 'Muitas requisições',
          description:
            'Você realizou muitas tentativas. Aguarde alguns instantes e tente novamente.',
        };

      case 500:
      case 502:
      case 503:
      case 504:
        return {
          variant: 'destructive',
          title: 'Erro interno do servidor',
          description:
            'Estamos enfrentando problemas técnicos. Por favor, tente novamente em alguns instantes ou entre em contato com o suporte.',
          action: SupportActionElement,
        };

      default:
        return {
          variant: 'destructive',
          title: 'Erro ao processar requisição',
          description:
            apiError.message ||
            'Não foi possível processar sua requisição. Tente novamente ou entre em contato com o suporte.',
          action: SupportActionElement,
        };
    }
  }

  // Se o erro é uma instância de Error
  if (error instanceof Error) {
    // Verifica se a mensagem contém um status code
    const statusMatch = error.message.match(/status: (\d+)/);
    if (statusMatch) {
      const statusCode = parseInt(statusMatch[1], 10);
      return handleApiError({ statusCode, message: error.message });
    }

    return {
      variant: 'destructive',
      title: 'Erro inesperado',
      description:
        error.message || 'Ocorreu um erro inesperado. Tente novamente.',
    };
  }

  // Erro desconhecido
  return {
    variant: 'destructive',
    title: 'Erro interno',
    description:
      'Não foi possível processar sua requisição. Tente novamente ou entre em contato com o suporte.',
    action: SupportActionElement,
  };
}

/**
 * Extrai informações de erro de uma resposta fetch
 */
export async function extractErrorFromResponse(
  response: Response
): Promise<ApiError> {
  try {
    const errorData = await response.json();
    return {
      message: errorData.message || errorData.error || 'Erro desconhecido',
      statusCode: response.status || errorData.statusCode,
      error: errorData.error,
    };
  } catch {
    return {
      message: `HTTP error! status: ${response.status}`,
      statusCode: response.status,
    };
  }
}
