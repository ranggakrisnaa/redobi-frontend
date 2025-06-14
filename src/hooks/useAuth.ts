// hooks/useAuth.ts
import { SignInSchema } from '@/commons/schema/sign-in.schema.ts';
import { ProfileFormSchema } from '@/commons/schema/update-profile.schema';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import { VerifySignInParams } from '@/commons/types/auth/verify-sign-in-params.type.ts';
import {
  authLogout,
  authResendOTPVerify,
  authSignIn,
  authVerifySignIn,
  getProfile,
  updateProfile,
} from '@/services/authService.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UseBaseMutationHandler } from './useBaseMutationHandler';

export const useAuthSignIn = () => {
  const { login, rememberMe } = useAuthStore();
  const { handleError, handleMutate, handleSettled, navigate } =
    UseBaseMutationHandler();

  return useMutation({
    mutationFn: (data: SignInSchema) => authSignIn(data),

    onMutate: handleMutate,

    onSuccess: (response: any) => {
      login(response.data, rememberMe);
      navigate('/verify');
    },

    onError: (error: any) => {
      if (error.status == 422) {
        handleError(
          error,
          'Login gagal. Periksa kembali email dan password Anda.',
        );
      } else {
        handleError(error, 'Login gagal. Terjadi kesalahan sistem.');
      }
    },

    onSettled: handleSettled,
  });
};

export const useAuthVerifySignIn = () => {
  const { rememberMe, setToken } = useAuthStore();
  const { handleError, handleMutate, handleSettled, navigate } =
    UseBaseMutationHandler();

  return useMutation({
    mutationFn: ({ data, user }: VerifySignInParams) =>
      authVerifySignIn({ data, user }),

    onMutate: handleMutate,

    onSuccess: (response: any) => {
      setToken(response.data.accessToken, rememberMe);
      navigate('/');
    },

    onError: (error: any) => {
      handleError(error, 'Verifikasi OTP gagal. Silakan coba lagi.');
    },

    onSettled: handleSettled,
  });
};

export const useAuthResendOTPVerify = () => {
  const { handleError, handleMutate, handleSettled } = UseBaseMutationHandler();
  const { login, user, rememberMe } = useAuthStore();

  return useMutation({
    mutationFn: (user: UserLoginData) => authResendOTPVerify(user),

    onMutate: handleMutate,

    onSuccess: () => {
      login(user as UserLoginData, rememberMe);
    },

    onError: (error: any) => {
      handleError(error, 'Gagal mengirim ulang kode OTP. Coba lagi nanti.');
    },

    onSettled: handleSettled,
  });
};

export const useAuthLogout = () => {
  const { handleError, handleMutate, handleSettled, navigate } =
    UseBaseMutationHandler();

  return useMutation({
    mutationFn: () => authLogout(),

    onMutate: handleMutate,

    onSuccess: () => {
      navigate('/sign-in');
    },

    onError: (error: any) => {
      handleError(error, 'Logout gagal. Silakan coba lagi.');
    },

    onSettled: handleSettled,
  });
};

export const useProfileUser = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response;
    },
  });
};

export const useUpdateProfile = () => {
  const {
    handleMutate,
    queryClient,
    handleError,
    handleSuccess,
    handleSettled,
  } = UseBaseMutationHandler();

  return useMutation({
    mutationFn: async (payload: ProfileFormSchema) => {
      const response = await updateProfile(payload);
      return response.data;
    },

    onMutate: handleMutate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      handleSuccess('Data profile berhasil diperbarui.', '/profile');
    },

    onError: (error: any) => {
      if (
        error.code == 'ERR_BAD_REQUEST' &&
        error.response.data.message == 'Criteria data already exist.'
      ) {
        handleError(error, 'Gagal! Data Dosen Pembimbing ini sudah ada.');
      } else {
        handleError(error, `Gagal!, ${error}`);
      }
    },

    onSettled: handleSettled,
  });
};
