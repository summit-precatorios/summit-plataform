import { getAllAnnouncements } from '@/services/announcement.service';
import { getAnnouncementsByUserDocument } from '@/services/user.service';
import { Announcement, Role, User } from '@/types';
import { useEffect, useState } from 'react';

export type AnnouncementsError = {
  type: 'FORBIDDEN' | 'UNAUTHORIZED' | 'NETWORK' | 'UNKNOWN';
  message: string;
  statusCode?: number;
};

export function useAnnouncements(
  user: User | null,
  isAllowedTo: (permission: string) => Promise<boolean>
) {
  const [orders, dispatchOrders] = useState<Announcement[]>([]);
  const [loading, dispatchLoading] = useState<boolean>(false);
  const [error, dispatchError] = useState<AnnouncementsError | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchOrders() {
      if (!user) return;

      dispatchLoading(true);
      dispatchError(null);

      try {
        // Valida se o usuário tem a role necessária antes de fazer o fetch
        const isAdmin = await isAllowedTo(Role.Admin);
        const isUser = await isAllowedTo(Role.User);

        // Se não for admin nem user, significa que não tem role válida (conta não ativada)
        if (!isAdmin && !isUser) {
          if (isMounted) {
            dispatchError({
              type: 'FORBIDDEN',
              message:
                'Conta não ativada. Por favor, confirme seu e-mail para acessar esta funcionalidade.',
              statusCode: 403,
            });
            dispatchOrders([]);
          }
          return;
        }

        const response = isAdmin
          ? await getAllAnnouncements()
          : await getAnnouncementsByUserDocument(user.document);

        if (isMounted) dispatchOrders(response || []);
      } catch (error) {
        if (!isMounted) return;

        // Tratamento específico de erros HTTP
        const httpError = error as Error & { statusCode?: number; status?: number };
        const statusCode = httpError.statusCode ?? httpError.status;

        if (statusCode === 403) {
          dispatchError({
            type: 'FORBIDDEN',
            message:
              'Você não tem permissão para acessar esta funcionalidade. Por favor, confirme seu e-mail.',
            statusCode: 403,
          });
        } else if (statusCode === 401) {
          dispatchError({
            type: 'UNAUTHORIZED',
            message: 'Sua sessão expirou. Por favor, faça login novamente.',
            statusCode: 401,
          });
        } else if (statusCode === 404) {
          // 404 não é um erro crítico, apenas não há dados
          dispatchOrders([]);
        } else {
          dispatchError({
            type: statusCode ? 'NETWORK' : 'UNKNOWN',
            message:
              'Não foi possível carregar os anúncios. Tente novamente mais tarde.',
            statusCode,
          });
        }
      } finally {
        if (isMounted) dispatchLoading(false);
      }
    }

    if (user) fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [user, isAllowedTo, refreshTick]);

  return { orders, loading, error, refetch: () => setRefreshTick(t => t + 1) };
}
