import { isCPFValid } from '@/lib/isCPFValid';
import { z } from 'zod';

export const baseAnnouncementSchema = z.object({
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

export const pixAnnouncementSchema = baseAnnouncementSchema.extend({
  paymentOption: z.literal('PIX'),
  pixKey: z.string().min(1, 'A chave pix é obrigatória'),
  ownerBankAccount: z.string().optional(),
  documentBankAccount: z.string().optional(),
  bankAccount: z.string().optional(),
  agencyBankAccount: z.string().optional(),
});

export const transferBankAnnouncementSchema = baseAnnouncementSchema.extend({
  paymentOption: z.literal('TRANSFER_BANK'),
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
  pixKey: z.string().optional(),
});

export const createAnnouncementSchema = z.discriminatedUnion('paymentOption', [
  pixAnnouncementSchema,
  transferBankAnnouncementSchema,
]);

export type CreateAnnouncementSchema = z.infer<typeof createAnnouncementSchema>;
