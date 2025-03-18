import apiService from '@/api/apiService.ts';
import { SignInSchema } from '@/commons/schema/sign-in.schema';
import { SignInFormProps } from '@/commons/types/sign-in-prop.type';
import AlertComponent from '@/components/commons/AlertComponent.tsx';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import AuthContainer from '@/components/containers/AuthContainer';
import SignInForm from '@/components/modules/auth/SignInForm';
import { useAuthStore } from '@/store/authStore.ts';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC<SignInFormProps> = () => {
  const { setUserId } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  type LoginResponse = {
    id: string;
    token: string;
  };

  const handleSuccess = async (data: SignInSchema) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiService.post<LoginResponse>(
        '/auth/login',
        data,
      );
      console.log(response.data);
      if (response.status === 200) {
        setUserId(response.data.id);
        navigate('/verify');
        return;
      }
    } catch {
      setError('Login gagal. Periksa kembali email dan password Anda.');
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
          <p className="text-3xl md:text-4xl text-center font-bold mb-10 2xl:mb-12">
            Selamat Datang
          </p>
          {error && (
            <AlertComponent>
              <p>{error}</p>
            </AlertComponent>
          )}
          <div className="min-w-96 2xl:min-w-[480px]">
            <SignInForm onSuccess={handleSuccess} />
          </div>
        </>
      )}
    </AuthContainer>
  );
};

export default SignInPage;
