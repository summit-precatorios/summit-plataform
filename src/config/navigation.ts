import { HelpCircle, Info, Mail, Shield } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Sobre', href: '/about', icon: Info },
  { label: 'Contato', href: '/contact', icon: Mail },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Privacidade', href: '/privacy', icon: Shield },
] as const;

export const FOOTER_LINKS = [
  { label: 'Aviso de Privacidade', href: '/privacy' },
  { label: 'Termos de Serviço', href: '/terms' },
  { label: 'Sobre', href: '/about' },
] as const;
