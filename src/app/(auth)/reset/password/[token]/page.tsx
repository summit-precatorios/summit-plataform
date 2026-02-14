import { ResetPasswordForm } from '../../../_components/reset-password-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redefinir Senha | Summit',
  description: 'Defina uma nova senha para acessar sua conta Summit.',
};

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  return <ResetPasswordForm params={params} />;
}
