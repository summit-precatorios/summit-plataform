import { isCPFValid } from '@/lib/isCPFValid'
import { z } from 'zod'

export const useAdvertise = () => {
  // Schema comum para ambos os tipos de pagamento
  const baseSchema = z.object({
    fullName: z
      .string()
      .min(3, 'Deve contar pelo menos 3 caracteres')
      .max(200, 'Deve conter no máximo 200 caracteres'),
    document: z
      .string()
      .refine((value) => isCPFValid(value), {
        message: 'CPF inválido',
      })
      .transform((value) => value.replace(/\D/g, '')),
    processNumber: z.string().transform((value) => value.replace(/\D/g, '')),
    processOrigin: z.string(),
    processCourt: z.string(),
    price: z.string(),
    salePrice: z.string(),
    liquidBalance: z.string(),
    paymentReceivingOption: z.enum(['PIX', 'TRANSFER_BANK']),
  })

  // Schema para opção PIX
  const pixSchema = baseSchema.extend({
    paymentReceivingOption: z.literal('PIX'),
    key: z.string().min(1, 'A chave pix é obrigatória'),

    // Tornar os campos de transferência opcionais
    ownerBankAccount: z.string().optional(),
    documentBankAccount: z.string().optional(),
    bankAccount: z.string().optional(),
    agencyBankAccount: z.string().optional(),
  })

  // Schema para opção Transferência Bancária
  const transferBankSchema = baseSchema.extend({
    paymentReceivingOption: z.literal('TRANSFER_BANK'),

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
    key: z.string().optional(),
  })

  const createAnnouncementSchema = z.discriminatedUnion(
    'paymentReceivingOption',
    [pixSchema, transferBankSchema],
  )

  return {
    createAnnouncementSchema,
  }
}
