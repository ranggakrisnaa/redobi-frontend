import { SignInSchema } from '@/commons/schema/sign-in.schema';
import AuthContainer from '@/components/containers/AuthContainer';
import SignInForm from '@/components/modules/auth/SignInForm';
import { SignInFormProps } from '@/types/sign-in-prop.types';

const SignInPage: React.FC<SignInFormProps> = () => {
  const handleSuccess = (data: SignInSchema) => {
    console.log('Form submitted successfully with:', data);
  };
  return (
    <AuthContainer>
      <p className="text-3xl md:text-4xl font-bold mb-10 2xl:mb-12">
        Selamat Datang
      </p>
      <div className="min-w-96 2xl:min-w-[480px]">
        <SignInForm onSuccess={handleSuccess} />
      </div>
    </AuthContainer>
  );
};

export default SignInPage;
