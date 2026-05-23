import { api } from '@/lib/api';
import { Announcement, CreateAnnouncementRequestData } from '@/types';

export async function createAnnouncementRequest(
  data: CreateAnnouncementRequestData
) {
  try {
    return await api.post('announcement', data);
  } catch (error) {
    console.error('error_creating_announcement', error);
    throw error;
  }
}

export async function getAnnouncementsByDocument(document: string) {
  try {
    const response = await api.get<Announcement>(`user/announcement/${document}`);

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
    const response = await api.get<Announcement[]>('announcement');

    return response;
  } catch (error) {
    console.error('fetch_error', {
      message: 'failed to fetch all announcements.',
      cause: error,
    });
    throw error;
  }
}

export async function updateAnnouncementStatus(
  id: string,
  status: 'APROVED' | 'PENDENT' | 'REPROVED'
) {
  try {
    return await api.patch(`announcement/${id}/status`, { status });
  } catch (error) {
    console.error('error_updating_announcement_status', error);
    throw error;
  }
}
