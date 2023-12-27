'use client';
import { CustomInputlabel } from '@/components/common/input-label';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
<<<<<<< Updated upstream
=======
import { ManageLocales } from '@/utils/translate';
import { useForgotPasswordMutation } from '@/features/api/forgot-password';
import { useRouter } from 'next/navigation';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import ErrorModel from './error';
>>>>>>> Stashed changes

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
    if (!emailErrorText.length && !value.length) {
      const res: any = ForgotPassword({
        email: value
      });

      if (res?.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <ErrorModel
            content={res?.error}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      } else {
        // if (res?.data) {
        //   localStorage.removeItem('Search');
        //   router.push('/otp-verification');
        // }
      }
    } else {
      setEmailErrorText('Please enter email');
    }
  };

  return (
<<<<<<< Updated upstream
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[20px] text-left mb-[40px]">
            <Image src={handImage} alt="Banner image" />
            <CustomInputlabel
              htmlfor={''}
              label={'Forgot Password'}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-[48px] font-semibold'
              }}
            />
            <div className="">
              <p className="text-solitaireTertiary">
                Please enter your registered phone number to reset password
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">
            <FloatingLabelInput
              label="Mobile Number"
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
                displayButtonLabel={'Send OTP'}
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
=======
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data-testid={'success-indicator'}
      />
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
                onChange={handleEmail}
                type="email"
                name="email"
                onKeyDown={handleKeyDown}
                value={value}
                errorText={emailErrorText}
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
                handleClick={() => router.push('/login')}
              />
            </div>
            <div className="">
              <CustomDisplayButton
                displayButtonLabel={ManageLocales('app.forgotpassword.submit')}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-solitaireQuaternary w-[500px] h-[54px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={handleSubmit}
              />
            </div>
          </div>
        }
      />
    </>
>>>>>>> Stashed changes
  );
};

export default ForgotPassword;
