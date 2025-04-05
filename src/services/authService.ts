import apiService from '@/api/apiService.ts';
import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';
import { ResendOtpResponse } from '@/commons/types/auth/resend-otp-res.type.ts';
import { SignInResponse } from '@/commons/types/auth/sign-in-res.type.ts';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import { VerifySignInParams } from '@/commons/types/auth/verify-sign-in-params.type.ts';
import { VerifySignInResponse } from '@/commons/types/auth/verify-sign-in-res.type.ts';

export const authSignIn = async (data: SignInSchema) => {
  const response = await apiService.post<SignInResponse>('/auth/login', data);
  return response.data;
};

export const authVerifySignIn = async ({
  data,
  user,
}: VerifySignInParams): Promise<VerifySignInResponse> => {
  console.log(user);
  const response = await apiService.post<VerifySignInResponse>(
    '/auth/verify-login',
    {
      otpCode: data.otpCode,
      userId: user.id,
    },
  );
  return response.data;
};

export const authResendOTPVerify = async (user: UserLoginData) => {
  const response = await apiService.post<ResendOtpResponse>('/auth/resend', {
    userId: user?.id,
    email: user?.email,
  });
  return response.data;
};
