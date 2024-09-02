import Image from 'next/image';
import React, { useState } from 'react';
import keyIcon from '@public/v2/assets/icons/modal/key.svg';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';

import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter } from 'next/navigation';
import { PasswordField } from '@/components/v2/common/input-field/password';
import { PASSWORD_REGEX } from '@/constants/validation-regex/regex';
import CommonPoppup from '../../login/component/common-poppup';
import { useChangePasswordMutation } from '@/features/api/change-password';
import useUser from '@/lib/use-auth';

const ResetComponent = ({ setIsDialogOpen, setDialogContent, token }: any) => {
  const [resetPasswordValue, setResetPasswordValue] = useState<string>('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const router = useRouter();
  const [ChangePassword] = useChangePasswordMutation();
  const { userLoggedOut } = useUser();

  const handleResetPassword = async () => {
    if (
      resetPasswordValue &&
      resetConfirmPassword &&
      !passwordError.length &&
      !confirmPasswordError &&
      resetPasswordValue === resetConfirmPassword
    ) {
      const res: any = await ChangePassword({
        new_password: resetPasswordValue,
        confirm_password: resetConfirmPassword,
        token: token.token
      });
      userLoggedOut();
      if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            content=""
            header={res?.error.data.message}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => {
                  setIsDialogOpen(false);
                },
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );
      } else {
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            status="success"
            content={''}
            customPoppupBodyStyle="mt-[70px]"
            header={
              'Password reset successful. For security, you were logged out from all devices.'
            }
            actionButtonData={[
              {
                variant: 'primary',
                label: 'Okay',
                handler: () => {
                  setIsDialogOpen(false), router.push('/v2/login');
                },
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );
      }
    } else {
      setPasswordError('Password and confirm password must match');
      setConfirmPasswordError('Password and confirm password must match');
    }
  };

  // Handle Enter key press for resetPassword
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleResetPassword();
    }
  };

  const handlePasswordInput = (e: any) => {
    const inputValue = e.target.value;
    setResetPasswordValue(inputValue);

    if (!PASSWORD_REGEX.test(inputValue)) {
      setPasswordError('Please enter valid password');
      if (
        !PASSWORD_REGEX.test(resetConfirmPassword) &&
        resetConfirmPassword.length > 0
      ) {
        setConfirmPasswordError('Please enter valid password');
      } else {
        setConfirmPasswordError('');
      }
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }
    if (resetConfirmPassword && inputValue !== resetConfirmPassword) {
      setPasswordError('Password and confirm password must match');
      setConfirmPasswordError('Password and confirm password must match');
    }
  };

  const handleConfirmPasswordInput = (e: any) => {
    const inputValue = e.target.value;
    setResetConfirmPassword(inputValue);
    if (!PASSWORD_REGEX.test(inputValue)) {
      setConfirmPasswordError('Please enter valid password');
      if (
        !PASSWORD_REGEX.test(resetPasswordValue) &&
        resetPasswordValue.length > 0
      ) {
        setPasswordError('Please enter valid password');
      } else {
        setPasswordError('');
      }
    } else {
      setConfirmPasswordError('');
      setPasswordError('');
    }
    if (resetPasswordValue && inputValue !== resetPasswordValue) {
      setPasswordError('Password and confirm password must match');
      setConfirmPasswordError('Password and confirm password must match');
    }
  };

  return (
    <div className="flex items-center text-center">
      <div className="flex flex-col w-[450px]  p-8 gap-[24px] mt-[-60px]">
        <div className="flex flex-col items-center">
          <Image src={keyIcon} alt="keyIcon" />
        </div>

        <div className="text-headingM text-neutral900 font-medium mt-[-170px]">
          {ManageLocales('app.setPassword')}
        </div>

        <div className="text-mRegular text-neutral900">
          {ManageLocales('app.setPassword.title')}
        </div>
        <div className="flex flex-col p-8 gap-[20px] rounded-[8px] border-[1px] border-neutral-200 ">
          <PasswordField
            label={'Enter Password*'}
            onChange={event => handlePasswordInput(event)}
            name="password"
            value={resetPasswordValue}
            errorText={passwordError}
            placeholder={ManageLocales('app.register.password.placeholder')}
          />
          {/* Input field for confirm password */}
          <PasswordField
            label={ManageLocales('app.register.confirmPassword')}
            onChange={event => handleConfirmPasswordInput(event)}
            name="confirmPassword"
            value={resetConfirmPassword}
            errorText={confirmPasswordError}
            placeholder={ManageLocales(
              'app.register.confirmPassword.placeholder'
            )}
            isConfirmPassword={true}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col gap-1">
            <IndividualActionButton
              onClick={handleResetPassword}
              variant={'primary'}
              size={'custom'}
              disabled={
                passwordError.length > 0 || confirmPasswordError.length > 0
              }
              className="rounded-[4px] w-[100%]"
            >
              {ManageLocales('app.resetPassword')}
            </IndividualActionButton>

            <IndividualActionButton
              onClick={() => router.push('/v2/login')}
              variant={'secondary'}
              size={'custom'}
              className="border-none w-[100%]"
            >
              <div className="text-mMedium font-medium flex items-center">
                <Image src={backArrow} alt="backArrow" />
                <p className="text-neutral900">
                  {ManageLocales('app.goBackToLogin')}
                </p>
              </div>
            </IndividualActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetComponent;
