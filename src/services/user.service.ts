import { decodeJwt } from '@/lib/auth';
import { api } from '@/lib/api';
import { Announcement } from '@/types';

type DecodedToken = {
  payload: {
    document: string;
    [key: string]: unknown;
  };
  roles?: string[];
};

export async function getCurrentUser(token?: string) {
  if (token) {
    const tokenDecoded = decodeJwt<DecodedToken>(token);
    return tokenDecoded?.payload.document ?? undefined;
  }
}

export async function getAnnouncementsByUserDocument(document: string) {
  try {
    return await api.get<Announcement[]>(`user/announcement/${document}`);
  } catch (error) {
    console.error('error_fetching_user_announcements', error);
    throw error;
  }
}
