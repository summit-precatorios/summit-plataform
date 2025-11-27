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

export type VerifyAccountRequestData = {
  document: string
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

export type Announcement = {
  id: string
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
  status?: string
  createdAt?: string
  pixKey?: string
  ownerBankAccount?: string
  documentBankAccount?: string
  bankAccount?: string
  agencyBankAccount?: string
}

export type Permission = string

export type User = {
  name: string
  email: string
  image: string | null
  document: string
  isActive: boolean
  roles: string[]
}

export enum Role {
  User = 'common-user',
  Admin = 'admin-user',
  AccountActivator = 'account-activator',
}
