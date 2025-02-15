import SignInForm from '@/components/modules/Auth/SignInForm';

type FormValues = {
  username: string;
};

type SignInFormProps = {
  onSuccess?: (data: FormValues) => void;
};

const SignInPage: React.FC<SignInFormProps> = () => {
  const handleSuccess = (data: { username: string }) => {
    console.log('Form submitted successfully with:', data);
  };
  return (
    <>
      <SignInForm onSuccess={handleSuccess} />
    </>
  );
};

export default SignInPage;
