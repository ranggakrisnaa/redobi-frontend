import apiService from '@/api/apiService.ts';
import { IUser } from '@/commons/interface-model/user-entity.interface';
import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';
import { ProfileFormSchema } from '@/commons/schema/update-profile.schema';
import { ResendOtpResponse } from '@/commons/types/auth/resend-otp-res.type.ts';
import { SignInResponse } from '@/commons/types/auth/sign-in-res.type.ts';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import { VerifySignInParams } from '@/commons/types/auth/verify-sign-in-params.type.ts';
import { VerifySignInResponse } from '@/commons/types/auth/verify-sign-in-res.type.ts';
import { ResponseData } from '@/utils/responseData';

export const authSignIn = async (data: SignInSchema) => {
  const response = await apiService.post<SignInResponse>('/auth/login', data);
  return response.data;
};

export const authVerifySignIn = async ({
  data,
  user,
}: VerifySignInParams): Promise<VerifySignInResponse> => {
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

export const authLogout = async () => {
  const response = await apiService.post('/auth/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await apiService.get<ResponseData<IUser>>('/users');
  return response.data;
};

export const updateProfile = async (payload: ProfileFormSchema) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    const value = payload[key as keyof ProfileFormSchema];
    if (value !== undefined && value !== null) {
      formData.append(
        key,
        (value as any) instanceof File ? value : String(value),
      );
    }
  });

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  const response = await apiService.put<ResponseData<IUser>>(
    '/users/update',
    formData,
  );

  return response.data;
};
