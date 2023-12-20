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
          <div className="flex flex-col gap-[20px] text-left mb-[40px]">
            <Image src={handImage} alt="Banner image" />
            <CustomInputlabel
              htmlfor={''}
              label={ManageLocales('app.forgotpassword')}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-[48px] font-semibold'
              }}
            />
            <div className="">
              <p className="text-solitaireTertiary">
                {ManageLocales('app.forgotpassword.message')}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">
            <FloatingLabelInput
              label={ManageLocales('app.forgotpassword.mobileNumber')}
              onChange={handleMobileNumber}
              type="number"
              name="number"
              onKeyDown={handleKeyDown}
              value={value}
            />

            <div>
              {/* Display error message if there is an error */}
              {/* <div className="h-6 mb-3">
                {isError ? (
                  <div className="text-red-600 flex text-left">{errorText}</div>
                ) : (
                  ''
                )}
              </div> */}
              {/* Button to trigger the login action */}

              <CustomDisplayButton
                displayButtonLabel={ManageLocales('app.forgotpassword.sendOtp')}
                displayButtonAllStyle={{
                  displayButtonStyle: 'bg-[#9f8b75] w-[500px] h-[64px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                // handleClick={handleLogin}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ForgotPassword;
