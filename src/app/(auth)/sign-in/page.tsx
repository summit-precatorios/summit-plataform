import { AuthForm } from '../_components/auth-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar | Summit',
  description: 'Acesse sua conta Summit para gerenciar seus anúncios.',
};

export default function Signin() {
  return <AuthForm />;
}
