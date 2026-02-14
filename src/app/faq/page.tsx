import type { Metadata } from 'next';
import { FaqClient } from './faq-client';

export const metadata: Metadata = {
  title: 'FAQ | Summit',
  description: 'Respostas para as principais dúvidas sobre a Summit.',
};

export default function FAQPage() {
  return <FaqClient />;
}
