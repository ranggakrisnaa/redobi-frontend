import background from '@/assets/images/background.png';
import icon from '@/assets/images/icon-batik.png';
import ilustration from '@/assets/images/ilustration-login.png';
import logo from '@/assets/images/redobi.png';
import { AuthContainerProps } from '@/commons/types/component-props.type.ts';
import * as React from 'react';

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col gap-6 md:gap-10 justify-center items-center p-6 md:p-8 bg-gradient-to-tr from-[#001a66] via-[#1663e7] to-[#b0c8f7]">
        <div className="absolute inset-0">
          <img
            src={background}
            alt="Background Image"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="flex flex-col items-center relative z-10 gap-3">
          <p className="text-3xl md:text-5xl font-bold text-center text-white">
            Sistem Rekomendasi
          </p>
          <p className="text-3xl md:text-5xl font-bold text-center text-white">
            Dosen Pembimbing
          </p>
        </div>
        <img
          src={ilustration}
          alt="Illustration"
          className="w-[571px] h-[443px] mt-12"
        />
      </div>
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center flex-col bg-white gap-6">
        <img
          src={logo}
          alt="Logo"
          className="w-[180px] 2xl:w-[250px] absolute top-[60px] 2xl:top-[120px]"
        />
        <img src={icon} className="absolute left-0 top-0" alt="icon" />
        <img
          src={icon}
          className="absolute right-0 bottom-0 [transform:rotate(180deg)]"
          alt="icon"
        />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
