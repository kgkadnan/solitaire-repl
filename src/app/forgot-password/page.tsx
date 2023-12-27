'use client';
import { CustomInputlabel } from '@/components/common/input-label';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useForgotPasswordMutation } from '@/features/api/forgot-password';
import { useRouter } from 'next/navigation';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import ErrorModel from './error';
import { ManageLocales } from '@/utils/translate';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const { modalState, modalSetState } = useModalStateManagement();

  const { dialogContent, isDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;

  // Use the forgot password mutation hook
  const [ForgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleEmail = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const res: any = ForgotPassword({
      email: value
    });

    console.log('res', res);

    // if (!emailErrorText.length && !value.length) {
    //   const res: any = ForgotPassword({
    //     email: value
    //   });

    //   if (res?.error) {
    //     setIsDialogOpen(true);
    //     setDialogContent(
    //       <ErrorModel
    //         content={res?.error}
    //         handleClick={() => setIsDialogOpen(false)}
    //       />
    //     );
    //   } else {
    //     // if (res?.data) {
    //     //   localStorage.removeItem('Search');
    //     //   router.push('/otp-verification');
    //     // }
    //   }
    // } else {
    //   setEmailErrorText('Please enter email');
    // }
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data-testid={'success-indicator'}
      />
      <UserAuthenticationLayout
        formData={
          <div className="flex justify-center flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4">
            <div className="flex flex-col gap-2 mb-10 items-center">
              <Image src={handImage} alt="Banner image" />
              <CustomInputlabel
                htmlfor={''}
                label={ManageLocales('app.forgotpassword')}
                overriddenStyles={{
                  label:
                    'text-solitaireQuaternary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'
                }}
              />
              <div className="w-3/4">
                <p className="text-solitaireTertiary text-sm sm:text-base md:[18px]">
                  {ManageLocales('app.forgotpassword.message')}
                </p>
              </div>
            </div>

            {/* Input field for email */}
            <div className="mb-6">
              <FloatingLabelInput
                label={ManageLocales('app.forgotpassword.emailId')}
                onChange={handleEmail}
                type="email"
                name="email"
                onKeyDown={handleKeyDown}
                value={value}
                errorText={emailErrorText}
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
                handleClick={() => router.push('/login')}
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
                handleClick={handleSubmit}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default ForgotPassword;
