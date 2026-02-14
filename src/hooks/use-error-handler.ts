import { useToast } from '@/components/ui/use-toast';
import {
  ConflictError,
  NetworkError,
  UnauthorizedError,
  ValidationError,
} from '@/exceptions/app-errors';
import { HttpClientError } from '@/lib/http-client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type ValidationBody = {
  errors?: Record<string, string[]>;
  message?: string;
};

function mapHttpError(error: HttpClientError) {
  if (error.status === 401) {
    return new UnauthorizedError();
  }
  if (error.status === 409) {
    const message =
      typeof error.body === 'object' && error.body
        ? (error.body as { message?: string }).message
        : undefined;
    return new ConflictError(message);
  }
  if (error.status === 422) {
    const errors =
      typeof error.body === 'object' && error.body
        ? (error.body as ValidationBody).errors
        : undefined;
    if (errors) {
      return new ValidationError(errors);
    }
  }

  return null;
}

export function useErrorHandler() {
  const { toast } = useToast();
  const router = useRouter();

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof HttpClientError) {
        const mapped = mapHttpError(error);
        if (mapped) {
          handleError(mapped);
          return;
        }
      }

      if (error instanceof UnauthorizedError) {
        toast({ variant: 'destructive', title: 'Sessão expirada' });
        router.push('/sign-in');
        return;
      }

      if (error instanceof ValidationError) {
        toast({
          variant: 'destructive',
          title: 'Dados inválidos',
          description: error.message,
        });
        return;
      }

      if (error instanceof NetworkError) {
        toast({
          variant: 'destructive',
          title: 'Erro de conexão',
          description: error.message,
        });
        return;
      }

      if (error instanceof ConflictError) {
        toast({
          variant: 'destructive',
          title: 'Conflito',
          description: error.message,
        });
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Erro interno',
        description: 'Não foi possível processar a sua requisição.',
      });
    },
    [toast, router]
  );

  return { handleError };
}
