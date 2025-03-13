import { VerifySignInSchema } from '@/commons/schema/verify-sign-in.schema';
import AuthContainer from '@/components/containers/AuthContainer';
import VerifySignInForm from '@/components/modules/auth/VerifySignInForm';

const VerifySignInPage = () => {
  const handleSuccess = (data: VerifySignInSchema) => {
    console.log('Form submitted successfully with:', data);
  };
  return (
    <AuthContainer>
      <div className="text-center max-w-[380px]">
        <p className="text-3xl md:text-4xl font-bold mb-10 2xl:mb-12">
          Masukkan Kode OTP
        </p>
        <p className="text-xl md:text-2xl font-normal">
          Kode verifikasi telah dikirim melalui email ke s*******@gmail.com
        </p>
        <p className="my-6 text-lg font-normal">Kode Verifikasi</p>
      </div>
      <div className="flex justify-center items-center mt-6">
        <VerifySignInForm onSuccess={handleSuccess} />
      </div>
      <div className="flex justify-center mt-6 gap-1">
        <p className="text-sm font-medium text-black">Tidak menerima kode?</p>
        <p className="text-sm font-medium text-primary-500">Kirim Ulang</p>
      </div>
    </AuthContainer>
  );
};

export default VerifySignInPage;
