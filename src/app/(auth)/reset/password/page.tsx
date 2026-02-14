import { RecoveryPasswordForm } from '../../_components/recovery-password-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recuperar Senha | Summit',
  description: 'Solicite a recuperação de senha da sua conta Summit.',
};

export default function RecoveryPassword() {
  return <RecoveryPasswordForm />;
}
