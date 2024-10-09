export type SignInRequestData = {
  document: string
  password: string
}

export type RegisterRequestData = {
  document: string
  email: string
  fullName: string
  password: string
}

export type ForgotPasswordRequestData = {
  email: string
}

export type ActiveAccountRequestData = {
  token: string | string[]
}

export type PaymentMethod = 'PIX' | 'TRANSFER_BANK'

export type CreateAnnouncementRequestData = {
  type: string
  ownerFullName: string
  ownerDocument: string
  lawSuit: string
  origin: string
  court: string
  price: string
  salePrice: string
  liquidBalance: string
  paymentOption: PaymentMethod
  pixKey?: string | undefined
  ownerBankAccount?: string | undefined
  documentBankAccount?: string | undefined
  bankAccount?: string | undefined
  agencyBankAccount?: string | undefined
}
