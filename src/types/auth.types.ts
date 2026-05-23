export type SignInRequestData = {
  document: string;
  password: string;
};

export type RegisterRequestData = {
  document: string;
  email: string;
  fullName: string;
  password: string;
};

export type ForgotPasswordRequestData = {
  email: string;
};

export type ActiveAccountRequestData = {
  token: string | string[];
};

export type VerifyAccountRequestData = {
  document: string;
};

export type SignInResponse = {
  accessToken: string;
};

export type ActiveAccountResponse = {
  accessToken: string;
};

export type VerifyAccountResponse = {
  message: string;
  statusCode: number;
  success: boolean;
};
