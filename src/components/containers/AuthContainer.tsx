import { ReactNode } from 'react';
import background from '../../../public/images/background.png';
import ilustration from '../../../public/images/ilustration-login.png';
import logo from '../../../public/images/redobi.png';

type AuthContainerProps = {
  children: ReactNode;
};

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center h-screen">
      {/* Bagian Kiri (Ilustrasi) */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col gap-6 md:gap-10 justify-center items-center p-6 md:p-8 bg-gradient-to-tr from-[#001a66] via-[#1663e7] to-[#b0c8f7]">
        <div className="absolute inset-0">
          <img
            src={background}
            alt="Background Image"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <p className="w-[80%] md:w-[486px] text-3xl md:text-5xl font-bold text-center leading-relaxed text-white relative z-10">
          Sistem Rekomendasi Dosen Pembimbing
        </p>
        <div className="w-3/4 md:w-auto relative z-10">
          <img src={ilustration} alt="Illustration" className="w-full h-auto" />
        </div>
      </div>

      <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-start items-center flex-col bg-white relative px-4">
        <img src={logo} alt="Logo" className="w-[180px] 2xl:w-[250px]" />
        <p className="text-3xl md:text-4xl font-bold mb-10 2xl:mb-12">
          Selamat Datang
        </p>
        <div className="min-w-96 2xl:min-w-[480px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
