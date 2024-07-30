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

export type PaymentMethod = {
  value: 'PIX' | 'TransferBank'
}
