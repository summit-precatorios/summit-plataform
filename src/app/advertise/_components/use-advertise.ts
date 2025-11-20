import { isCPFValid } from '@/lib/isCPFValid';
import { z } from 'zod';

export const useAdvertise = () => {
  // Schema comum para ambos os tipos de pagamento
  const baseSchema = z.object({
    type: z.string(),
    ownerFullName: z
      .string()
      .min(3, 'Deve contar pelo menos 3 caracteres')
      .max(200, 'Deve conter no máximo 200 caracteres'),
    ownerDocument: z
      .string()
      .refine((value) => isCPFValid(value), {
        message: 'CPF inválido',
      })
      .transform((value) => value.replace(/\D/g, '')),
    lawSuit: z.string().transform((value) => value.replace(/\D/g, '')),
    origin: z.string(),
    court: z.string(),
    price: z.string(),
    salePrice: z.string(),
    liquidBalance: z.string(),
    paymentOption: z.enum(['PIX', 'TRANSFER_BANK']),
  });

  // Schema para opção PIX
  const pixSchema = baseSchema.extend({
    paymentOption: z.literal('PIX'),
    pixKey: z.string().min(1, 'A chave pix é obrigatória'),

    // Tornar os campos de transferência opcionais
    ownerBankAccount: z.string().optional(),
    documentBankAccount: z.string().optional(),
    bankAccount: z.string().optional(),
    agencyBankAccount: z.string().optional(),
  });

  // Schema para opção Transferência Bancária
  const transferBankSchema = baseSchema.extend({
    paymentOption: z.literal('TRANSFER_BANK'),

    // Campos obrigatórios para transferência bancária
    ownerBankAccount: z.string().min(3, 'O titular da conta é obrigatório'),
    documentBankAccount: z.string(),
    bankAccount: z
      .string()
      .min(4, 'A conta bancária deve ter no mínimo 4 dígitos')
      .transform((value) => value.replace(/\D/g, '')),
    agencyBankAccount: z
      .string()
      .min(1, 'Agência obrigatória')
      .max(4, 'A agência bancária deve ter no máximo 4 dígitos'),

    // Tornar o campo PIX opcional
    pixKey: z.string().optional(),
  });

  const createAnnouncementSchema = z.discriminatedUnion('paymentOption', [
    pixSchema,
    transferBankSchema,
  ]);

  return {
    createAnnouncementSchema,
  };
};
