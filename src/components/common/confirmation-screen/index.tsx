'use client';

import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React from 'react';
import confirmImage from '@public/assets/icons/confirmation.svg';

const ConfirmationScreen = ({ message, buttons }: any) => {
  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[8px] mb-[20px] items-center">
            <Image src={confirmImage} alt="Banner image" />
            <div className="">
              <p className="text-solitaireTertiary mb-[20px] w-[90%] text-[16px]">
                {message}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">{buttons}</div>
        </div>
      }
    />
  );
};

export default ConfirmationScreen;
