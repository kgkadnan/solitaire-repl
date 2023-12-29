'use client';
import { CustomInputlabel } from '@/components/common/input-label';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '@public/assets/icons/vector.svg';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useForgotPasswordMutation } from '@/features/api/forgot-password';
import { useRouter } from 'next/navigation';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import ErrorModel from './component/error';
import { ManageLocales } from '@/utils/translate';
import ConfirmationScreen from '@/components/common/confirmation-screen';
import { isEmailValid } from '@/utils/validate-email';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const { modalState, modalSetState } = useModalStateManagement();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { dialogContent, isDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;

  // Use the forgot password mutation hook
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleEmail = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (isEmailValid(inputValue)) {
      setEmailErrorText('');
    } else {
      setEmailErrorText('Please enter a valid email');
    }
  };

  const handleSubmit = async () => {
    if (value.length && !emailErrorText) {
      let res: any = await forgotPassword({
        email: value
      });

      if (res?.data?.statusCode === 204) {
        setIsConfirmed(true);
      } else if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <ErrorModel
            content={res?.error.data.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      }
    } else {
      setEmailErrorText('Please enter a valid email');
    }
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data-testid={'success-indicator'}
      />
      {isConfirmed ? (
        <ConfirmationScreen
          message="An email with a link has been sent to your registered email for password reset."
          buttons={
            <div>
              <CustomDisplayButton
                displayButtonLabel={'Go back to Login'}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-solitaireQuaternary w-[500px] h-[54px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={() => router.push('/login')}
              />
            </div>
          }
        />
      ) : (
        <UserAuthenticationLayout
          formData={
            <div className="flex justify-center flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:[500px] mx-auto px-4">
              <div className="flex flex-col gap-2 mb-10 items-center">
                <Image
                  src={Logo}
                  alt="Banner image"
                  style={{ width: '60px', height: '80px' }}
                />
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
                  displayButtonLabel={ManageLocales(
                    'app.forgotpassword.submit'
                  )}
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
      )}
    </>
  );
};

export default ForgotPassword;
