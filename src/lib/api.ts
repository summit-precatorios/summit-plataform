import { createHttpClient } from '@/lib/http-client';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

if (!apiKey) {
  throw new Error('NEXT_PUBLIC_API_KEY is not defined');
}

export const api = createHttpClient({
  baseURL,
  headers: {
    'x-api-key': apiKey,
  },
});
