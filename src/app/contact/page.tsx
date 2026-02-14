import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contato | Summit',
  description: 'Fale com a equipe Summit para suporte e informações.',
};

export default function ContactPage() {
  return <ContactClient />;
}
