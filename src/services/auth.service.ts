import { api } from '@/lib/api';
import {
  ActiveAccountRequestData,
  ActiveAccountResponse,
  ForgotPasswordRequestData,
  RegisterRequestData,
  SignInResponse,
  SignInRequestData,
  VerifyAccountRequestData,
  VerifyAccountResponse,
} from '@/types';

export async function signInRequest({
  document,
  password,
}: SignInRequestData): Promise<SignInResponse> {
  try {
    return await api.post('auth/signin', { document, password });
  } catch (error) {
    console.error('error_fetching_data', error);
    throw error;
  }
}

export async function registerRequest(data: RegisterRequestData) {
  try {
    return await api.post('auth/register', data);
  } catch (error) {
    console.error('error_registering_user', error);
    throw error;
  }
}

export async function forgotPassword(data: ForgotPasswordRequestData) {
  try {
    return await api.post('auth/recovery/request', data);
  } catch (error) {
    console.error('error_requesting_password_recovery', error);
    throw error;
  }
}

export async function activeAccount(data: ActiveAccountRequestData) {
  try {
    return await api.patch<ActiveAccountResponse>('auth/active/account', data);
  } catch (error) {
    console.error('error_activating_account', error);
    throw error;
  }
}

export async function verifyAccountByDocument(data: VerifyAccountRequestData): Promise<VerifyAccountResponse> {
  try {
    return await api.patch<VerifyAccountResponse>('auth/verify/account', data);
  } catch (error) {
    console.error('error_verifying_account', error);
    throw error;
  }
}
