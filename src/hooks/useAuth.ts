// hooks/useAuth.ts
import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import { VerifySignInParams } from '@/commons/types/auth/verify-sign-in-params.type.ts';
import {
  authResendOTPVerify,
  authSignIn,
  authVerifySignIn,
} from '@/services/authService.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useAuthSignIn = () => {
  const { setLoading, setError } = useGlobalStore();
  const { login, rememberMe } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignInSchema) => authSignIn(data),

    onMutate: () => {
      setLoading(true);
      setError(null);
    },

    onSuccess: (response: any) => {
      login(response, rememberMe);
      navigate('/verify');
    },

    onError: (error: any) => {
      console.error(error);
      if (error.status == 422) {
        setError('Login gagal. Periksa kembali email dan password Anda.');
      } else {
        setError('Login gagal. Terjadi kesalahan sistem.');
      }
    },

    onSettled: () => {
      setLoading(false);
    },
  });
};

export const useAuthVerifySignIn = () => {
  const { setLoading, setError } = useGlobalStore();
  const { rememberMe, setToken } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ data, user }: VerifySignInParams) =>
      authVerifySignIn({ data, user }),

    onMutate: () => {
      setLoading(true);
      setError(null);
    },

    onSuccess: (response: any) => {
      setToken(response.accessToken, rememberMe);
      navigate('/');
    },

    onError: (error: any) => {
      console.error(error);
      setError('Verifikasi OTP gagal. Silakan coba lagi.');
    },

    onSettled: () => {
      setLoading(false);
    },
  });
};

export const useAuthResendOTPVerify = () => {
  const { setLoading, setError } = useGlobalStore();
  const { login, user, rememberMe } = useAuthStore();

  return useMutation({
    mutationFn: (user: UserLoginData) => authResendOTPVerify(user),

    onMutate: () => {
      setLoading(true);
      setError(null);
    },

    onSuccess: () => {
      login(user as UserLoginData, rememberMe);
    },

    onError: (error: any) => {
      console.error(error);
      setError('Gagal mengirim ulang kode OTP. Coba lagi nanti.');
    },

    onSettled: () => {
      setLoading(false);
    },
  });
};
