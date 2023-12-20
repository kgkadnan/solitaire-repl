'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';

const ResetPassword = () => {
  // State variables for email, password, and error handling
  const [resetPassword, setResetPassword] = useState<string>('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState<string>('');
  const [comparePasswordError, setComparePasswordError] = useState<string>('');

  const handleResetPassword = () => {
    if (resetPassword === resetConfirmPassword) {
    } else {
      setComparePasswordError('Password and confirm password must match');
    }
  };

  // Handle Enter key press for resetPassword
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleResetPassword();
    }
  };

  const handlePasswordInput = (e: any) => {
    setResetPassword(e.target.value);
    setComparePasswordError('');
  };

  const handleConfirmPasswordInput = (e: any) => {
    setResetConfirmPassword(e.target.value);
    setComparePasswordError('');
  };

  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[20px] text-left mb-[40px]">
            <Image src={handImage} alt="Banner image" />
            <CustomInputlabel
              htmlfor={''}
              label={'Reset Password'}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-[48px] font-semibold'
              }}
            />
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">
            <FloatingLabelInput
              label="Password*"
              onChange={handlePasswordInput}
              type="password"
              name="password"
              onKeyDown={handleKeyDown}
              value={resetPassword}
              errorText={comparePasswordError}
            />
            {/* Input field for password */}
            <FloatingLabelInput
              label="Confirm Password*"
              onChange={handleConfirmPasswordInput}
              type="Password"
              name="Password"
              onKeyDown={handleKeyDown}
              value={resetConfirmPassword}
              errorText={comparePasswordError}
            />

            <div>
              <CustomDisplayButton
                displayButtonLabel={'Reset Password'}
                displayButtonAllStyle={{
                  displayButtonStyle: 'bg-[#9f8b75] w-[500px] h-[64px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={handleResetPassword}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ResetPassword;
