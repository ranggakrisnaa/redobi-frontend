import { LoginSchema } from '@/commons/schema/sign-in.schema';
import AuthContainer from '@/components/containers/AuthContainer';
import SignInForm from '@/components/modules/auth/SignInForm';
import { SignInFormProps } from '@/types/sign-in-props.types';

const SignInPage: React.FC<SignInFormProps> = () => {
  const handleSuccess = (data: LoginSchema) => {
    console.log('Form submitted successfully with:', data);
  };
  return (
    <AuthContainer>
      <SignInForm onSuccess={handleSuccess} />
    </AuthContainer>
  );
};

export default SignInPage;
