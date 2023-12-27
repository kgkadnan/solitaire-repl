'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { ManageLocales } from '@/utils/translate';

const ResetPassword = () => {
  // State variables for email, password, and error handling
  const [resetPassword, setResetPassword] = useState<string>('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState<string>('');
  const [comparePasswordError, setComparePasswordError] = useState<string>('');

  const handleResetPassword = () => {
    if (resetPassword === resetConfirmPassword) {
      console.log('Complete');
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
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
      <div className="flex flex-col gap-[8px] mb-8 items-center w-full max-w-md text-center">
        <Image src={handImage} alt="Banner image" />
        <CustomInputlabel
          htmlfor={''}
          label={ManageLocales('app.resetPassword.resetPassword')}
          overriddenStyles={{
            label: 'lg:text-[48px] md:text-[30px] sm:text-[20px] font-semibold '
          }}
        />
      </div>

      <div className="flex flex-col gap-8 w-full max-w-md">
        <FloatingLabelInput
          label={ManageLocales('app.resetPassword.password')}
          onChange={handlePasswordInput}
          type="password"
          name="password"
          onKeyDown={handleKeyDown}
          value={resetPassword}
          errorText={comparePasswordError}
          showPassword={true}
        />
        <FloatingLabelInput
          label={ManageLocales('app.resetPassword.confirmPassword')}
          onChange={handleConfirmPasswordInput}
          type="password"
          name="confirmPassword"
          onKeyDown={handleKeyDown}
          value={resetConfirmPassword}
          errorText={comparePasswordError}
          showPassword={true}
        />

        <div>
          <CustomDisplayButton
            displayButtonLabel={ManageLocales(
              'app.resetPassword.resetPassword'
            )}
            displayButtonAllStyle={{
              displayButtonStyle:
                'bg-solitaireQuaternary w-full lg:h-[64px] md:h-[50px] sm:h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary lg:text-[16px] sm:text-[14px] md:text-[16px] font-medium'
            }}
            handleClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
