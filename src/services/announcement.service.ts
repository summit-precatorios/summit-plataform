import { api, providerBaseHeaders } from '@/lib/api';
import { CreateAnnouncementRequestData } from '@/types';

export async function createAnnouncementRequest(
  data: CreateAnnouncementRequestData
) {
  try {
    return await api('announcement', {
      method: 'POST',
      headers: providerBaseHeaders(),
      body: JSON.stringify(data, null, 2),
    });
  } catch (error) {
    console.error('error_creating_announcement', error);
    throw error;
  }
}

export async function getAnnouncementsByDocument(document: string) {
  try {
    const response = await api(`user/announcement/${document}`, {
      method: 'GET',
      headers: providerBaseHeaders(),
    });

    return response;
  } catch (error) {
    console.error('fetch_error', {
      message: 'failed to fetch announcements by user document.',
      cause: error,
    });

    throw error;
  }
}

export async function getAllAnnouncements() {
  try {
    const response = await api('announcements', {
      method: 'GET',
      headers: providerBaseHeaders(),
    });

    return response;
  } catch (error) {
    console.error('fetch_error', {
      message: 'failed to fetch all announcements.',
      cause: error,
    });
    throw error;
  }
}
