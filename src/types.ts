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
