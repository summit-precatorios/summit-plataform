import { RegisterForm } from '../_components/register-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta | Summit',
  description: 'Crie sua conta Summit para negociar RPVs e precatórios.',
};

export default function Register() {
  return <RegisterForm />;
}
