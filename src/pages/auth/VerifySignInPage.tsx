import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema';
import { UserLoginData } from '@/commons/types/auth/user-login-data.type.ts';
import AlertComponent from '@/components/commons/AlertComponent.tsx';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import AuthContainer from '@/components/containers/AuthContainer';
import VerifySignInForm from '@/components/modules/auth/VerifySignInForm';
import {
  useAuthResendOTPVerify,
  useAuthVerifySignIn,
} from '@/hooks/useAuth.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import { maskEmail } from '@/utils/utils.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifySignInPage = () => {
  const { user, checkSession } = useAuthStore();
  const navigate = useNavigate();
  const { error, loading } = useGlobalStore();
  const { mutate: verifySignInMutate } = useAuthVerifySignIn();
  const { mutate: resendOTPVerifyMutate } = useAuthResendOTPVerify();

  useEffect(() => {
    checkSession();
    if (!user) {
      navigate('/sign-in');
    }
  }, [checkSession, user, navigate]);

  const handleResendOTP = async () => {
    resendOTPVerifyMutate(user as UserLoginData);
  };

  const handleSuccess = async (data: VerifySignInSchema) => {
    verifySignInMutate({ data, user: user as UserLoginData });
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
