import { createHttpClient } from '@/lib/http-client';

export const api = createHttpClient({ baseURL: '/api/proxy/' });
