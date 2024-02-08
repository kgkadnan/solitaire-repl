import Image from 'next/image';
import React, { ReactNode } from 'react';
import Banner from '@public/assets/images/Form-image.png';

interface IUserAuthenticationLayoutProps {
  formData: ReactNode;
}

const UserAuthenticationLayout: React.FC<IUserAuthenticationLayoutProps> = ({
  formData
}) => {
  return (
    <div className="w-full flex">
      <div className="w-[50%] h-full ">
        <div>
          <Image
            style={{ width: '100vw', height: '100vh' }}
            src={Banner}
            alt="Banner image"
          />
        </div>
      </div>
      <div className="w-[50%] flex justify-center text-center h-[100vh] overflow-y-scroll items-center">
        {formData}
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
