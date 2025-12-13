// app/fonts.ts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const fonts = {
  inter,
};
