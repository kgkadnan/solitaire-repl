'use client';
import { CustomInputlabel } from '@/components/common/input-label';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from '@/utils/translate';

const ForgotPassword = () => {
  const [value, setValue] = useState('');

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleLogin();
    }
  };

  const handleMobileNumber = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[8px] mb-[40px] items-center">
            <Image src={handImage} alt="Banner image" />
            <CustomInputlabel
              htmlfor={''}
              label={ManageLocales('app.forgotpassword')}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-[48px] font-semibold'
              }}
            />
            <div className="w-[70%]">
              <p className="text-solitaireTertiary text-[16px]">
                {ManageLocales('app.forgotpassword.message')}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="mb-[30px]">
            <FloatingLabelInput
              label={ManageLocales('app.forgotpassword.emailId')}
              onChange={handleMobileNumber}
              type="number"
              name="number"
              onKeyDown={handleKeyDown}
              value={value}
            />
          </div>
          <div className="mb-[20px]">
            <CustomDisplayButton
              displayButtonLabel={ManageLocales(
                'app.forgotpassword.goBackToLogin'
              )}
              displayButtonAllStyle={{
                displayButtonStyle:
                  'bg-[transparent] border-[1px] border-solitaireQuaternary w-[500px] h-[54px] mb-[]',
                displayLabelStyle:
                  'text-solitaireTertiary text-[16px] font-medium'
              }}
              // handleClick={handleLogin}
            />
          </div>
          <div className="">
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.forgotpassword.submit')}
              displayButtonAllStyle={{
                displayButtonStyle: 'bg-solitaireQuaternary w-[500px] h-[54px]',
                displayLabelStyle:
                  'text-solitaireTertiary text-[16px] font-medium'
              }}
              // handleClick={handleLogin}
            />
          </div>
        </div>
      }
    />
  );
};

export default ForgotPassword;
