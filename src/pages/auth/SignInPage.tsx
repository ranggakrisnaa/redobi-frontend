import { SignInSchema } from '@/commons/schema/sign-in.schema';
import { SignInProps } from '@/commons/types/pages-props.type.ts';
import AlertComponent from '@/components/commons/AlertComponent.tsx';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import AuthContainer from '@/components/containers/AuthContainer';
import SignInForm from '@/components/modules/auth/SignInForm';
import { useAuthSignIn } from '@/hooks/useAuth.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC<SignInProps> = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { mutate } = useAuthSignIn();
  const { loading, error } = useGlobalStore();

  useEffect(() => {
    if (user) {
      navigate('/verify', { replace: true });
    }
  }, [user, navigate]);

  const handleForgotPassword = () => {
    console.log('clicked');
  };

  const handleSuccess = async (data: SignInSchema) => {
    mutate(data);
  };

  return (
    <AuthContainer>
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <LoadingComponent />
        </div>
      ) : (
        <>
          <div className="min-w-96 2xl:min-w-[480px]">
            <p className="text-3xl md:text-4xl text-center font-bold mb-2">
              Selamat Datang
            </p>
            <p className="text-center font-medium mb-8">
              Masuk ke akun Anda untuk mengakses semua fitur.
            </p>
            {error && (
              <AlertComponent>
                <p>{error}</p>
              </AlertComponent>
            )}
            <SignInForm
              onSuccess={handleSuccess}
              onClick={handleForgotPassword}
            />
          </div>
        </>
      )}
    </AuthContainer>
  );
};

export default SignInPage;
