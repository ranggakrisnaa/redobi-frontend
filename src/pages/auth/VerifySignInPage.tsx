import apiService from '@/api/apiService.ts';
import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema';
import { ResendOtpResponse } from '@/commons/types/auth/resend-otp-res.type.ts';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import AlertComponent from '@/components/commons/AlertComponent.tsx';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import AuthContainer from '@/components/containers/AuthContainer';
import VerifySignInForm from '@/components/modules/auth/VerifySignInForm';
import { useAuthStore } from '@/store/authStore.ts';
import { maskEmail } from '@/utils/utils.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type VerifyLoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
};

const VerifySignInPage = () => {
  const { rememberMe, login, user, checkSession, setToken } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    checkSession();
    if (!user) {
      navigate('/sign-in');
    }
  }, [checkSession, user, navigate]);

  const handleResendOTP = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiService.post<ResendOtpResponse>(
        '/auth/resend',
        { userId: user?.id, email: user?.email },
      );
      if (response.status == 200) {
        login(user as UserLoginData, rememberMe);
        return;
      }
    } catch {
      setError('Gagal mengirim ulang kode OTP. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = async (data: VerifySignInSchema) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiService.post<VerifyLoginResponse>(
        '/auth/verify-login',
        { userId: user?.id, otpCode: data.otpCode },
      );
      if (response.status === 200) {
        setToken(response.data.accessToken, rememberMe);
        navigate('/');
        return;
      }
    } catch {
      setError('Verifikasi OTP gagal. Cek kembali OTP yang dikirimkan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <LoadingComponent />
        </div>
      ) : (
        <>
          <div className="flex justify-center flex-col items-center">
            <div className="text-center max-w-[420px]">
              <p className="text-3xl md:text-4xl font-bold mb-2">
                Masukkan Kode OTP
              </p>
              {error ? (
                <div className="text-left w-full">
                  <AlertComponent>
                    <p>{error}</p>
                  </AlertComponent>
                </div>
              ) : (
                <p className="text-lg md:text-xl font-normal">
                  Kode verifikasi telah dikirim melalui email ke{' '}
                  {maskEmail(user?.email)}
                </p>
              )}
              <p className="my-6 text-lg font-normal">Kode Verifikasi</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <VerifySignInForm onSuccess={handleSuccess} />
          </div>
          <div className="flex justify-center mt-6 gap-1">
            <p className="text-sm font-medium text-black">
              Tidak menerima kode?
            </p>
            <p
              className="text-sm font-medium text-primary-500 select-none hover:cursor-pointer z-50"
              onClick={handleResendOTP}
            >
              Kirim Ulang
            </p>
          </div>
        </>
      )}
    </AuthContainer>
  );
};

export default VerifySignInPage;
