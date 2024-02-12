import Image from 'next/image';
import React, { ReactNode } from 'react';
import Register from '@public/v2/assets/images/auth-layout/register.png';
import Confirm from '@public/v2/assets/images/auth-layout/confirm.png';
import Default from '@public/v2/assets/images/auth-layout/default.png';

interface IUserAuthenticationLayoutProps {
  formData: ReactNode;
  screen: string;
}

const UserAuthenticationLayout: React.FC<IUserAuthenticationLayoutProps> = ({
  formData,
  screen
}) => {
  const renderLayoutImage = (screen: string) => {
    switch (screen) {
      case 'register':
        return Register;

      case 'OTPVerification':
        return Default;

      case 'successfullyCreated':
        return Confirm;
      default:
        return Default;
    }
  };
  return (
    <div className="w-full flex">
      <div className="w-[50%] h-full ">
        <div className="h-full">
          <Image
            style={{ width: '100vw', height: '100vh' }}
            src={renderLayoutImage(screen)}
            alt="Banner image"
          />
        </div>
      </div>
      <div className="w-[50%] flex justify-center text-center h-[100vh]  overflow-y-scroll">
        {formData}
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
