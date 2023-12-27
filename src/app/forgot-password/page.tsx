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
        <div className="flex justify-center flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4">
          <div className="flex flex-col items-center gap-2 mb-10">
            <Image src={handImage} alt="Banner image" className="w-15 h-20" />
            <CustomInputlabel
              htmlfor={''}
              label={ManageLocales('app.forgotpassword')}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-4xl font-semibold mb-4'
              }}
            />
            <div className="w-11/12 sm:w-3/4 md:w-2/3">
              <p className="text-solitaireTertiary text-base">
                {ManageLocales('app.forgotpassword.message')}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="mb-8">
            <FloatingLabelInput
              label={ManageLocales('app.forgotpassword.emailId')}
              onChange={handleMobileNumber}
              type="number"
              name="number"
              onKeyDown={handleKeyDown}
              value={value}
            />
          </div>
          <div className="mb-5">
            <CustomDisplayButton
              displayButtonLabel={ManageLocales(
                'app.forgotpassword.goBackToLogin'
              )}
              displayButtonAllStyle={{
                displayButtonStyle:
                  'bg-transparent border border-solitaireQuaternary w-full h-14',
                displayLabelStyle:
                  'text-solitaireTertiary text-base font-medium'
              }}
              // handleClick={handleGoBackToLogin}
            />
          </div>
          <div>
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.forgotpassword.submit')}
              displayButtonAllStyle={{
                displayButtonStyle: 'bg-solitaireQuaternary w-full h-14',
                displayLabelStyle:
                  'text-solitaireTertiary text-base font-medium'
              }}
              // handleClick={handleSubmit}
            />
          </div>
        </div>
      }
    />
  );
};

export default ForgotPassword;
