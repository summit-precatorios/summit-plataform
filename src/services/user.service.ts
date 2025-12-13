import { api, providerBaseHeaders } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  payload: {
    document: string;
    [key: string]: unknown;
  };
  roles?: string[];
};

export async function getCurrentUser(token?: string) {
  if (token) {
    const tokenDecoded = jwtDecode<DecodedToken>(token as string);

    return tokenDecoded.payload.document ?? undefined;
  }
}

export async function getAnnouncementsByUserDocument(document: string) {
  try {
    return await api(`user/announcement/${document}`, {
      method: 'GET',
      headers: providerBaseHeaders(),
    });
  } catch (error) {
    console.error('error_fetching_user_announcements', error);
    throw error;
  }
}
