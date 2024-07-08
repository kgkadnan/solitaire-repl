import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { handleLoginInputChange } from '../helpers/handle-login-input-change';
import Link from 'next/link';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { PasswordField } from '@/components/v2/common/input-field/password';
import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { KgkDiamondLaunchDialog } from '@/components/v2/common/dialog/kgk-diamond-launch-modal';
import { InputField } from '@/components/v2/common/input-field';

const LoginComponent = ({
  setPhoneNumber,
  setPhoneErrorText,
  setPasswordErrorText,
  setPassword,
  handleKeyDown,
  phoneNumber,
  phoneErrorText,
  password,
  passwordErrorText,
  handleLogin,
  currentCountryCode,
  setEmail,
  setEmailErrorText,
  email,
  emailErrorText,
  loginByEmail,
  setLoginByEmail
}: any) => {
  const [isKeepSignedIn, setIsKeepSignedIn] = useState(false);
  const router = useRouter();
  const pathName = useSearchParams().get('path');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (
      currentCountryCode &&
      currentCountryCode.country_calling_code !== '+91'
    ) {
      setIsDialogOpen(true);
    }
  }, [currentCountryCode]);

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior
    handleLogin(); // Your login handler
  };

  return (
    <>
      <KgkDiamondLaunchDialog
        isOpens={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <form onSubmit={handleSubmit} className="flex items-center text-center">
        {' '}
        {/* Wrap with form and handle onSubmit */}
        <div className="flex flex-col w-[450px]  p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral-200 ">
          <div className="flex flex-col items-center">
            <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />
          </div>
          <div className="parent relative">
            <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
          </div>

          <div className="text-headingM text-neutral900 font-medium text-left">
            {ManageLocales('app.login')}
          </div>
          <div className="flex">
            <button
              className={`py-2 px-4 text-mMedium font-medium ${
                !loginByEmail
                  ? 'text-neutral900 border-b-[2px] border-primaryMain'
                  : 'text-neutral600 border-b-[1px] border-[#E4E7EC]'
              }`}
              key={'Mobile'}
              onClick={() => setLoginByEmail(false)}
            >
              <div className="flex gap-1">Mobile</div>
            </button>
            <button
              className={`py-2 px-4 text-mMedium font-medium  ${
                loginByEmail
                  ? 'text-neutral900 border-b-[2px] border-primaryMain'
                  : 'text-neutral600 border-b-[1px] border-[#E4E7EC]'
              }`}
              key={'Email'}
              onClick={() => setLoginByEmail(true)}
            >
              <div className="flex gap-1">Email</div>
            </button>
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-5">
            {loginByEmail ? (
              <InputField
                label={ManageLocales('app.register.email')}
                onChange={event =>
                  handleLoginInputChange({
                    event,
                    type: 'email',
                    setEmail,
                    setEmailErrorText,
                    setPasswordErrorText,
                    setPassword
                  })
                }
                type="email"
                name="email"
                value={email}
                errorText={emailErrorText}
                placeholder={ManageLocales('app.register.email.placeholder')}
                styles={{ inputMain: 'h-[64px]' }}
                autoComplete="none"
              />
            ) : (
              <MobileInput
                label={ManageLocales('app.register.mobileNumber')}
                onChange={event => {
                  handleLoginInputChange({
                    event,
                    type: 'phone',
                    setPhoneNumber,
                    setPhoneErrorText,
                    setPasswordErrorText,
                    setPassword
                  });
                }}
                type="number"
                name="mobileNumber"
                errorText={phoneErrorText}
                placeholder={ManageLocales(
                  'app.register.mobileNumber.placeholder'
                )}
                registerFormState={phoneNumber}
                setRegisterFormState={setPhoneNumber}
                value={phoneNumber.mobileNumber}
                onKeyDown={handleKeyDown}
              />
            )}
            <PasswordField
              label={ManageLocales('app.register.password')}
              onChange={event =>
                handleLoginInputChange({
                  event,
                  type: 'password',
                  setPhoneNumber,
                  setPhoneErrorText,
                  setPasswordErrorText,
                  setPassword
                })
              }
              name="password"
              value={password}
              errorText={passwordErrorText}
              placeholder={ManageLocales('app.login.password.placeholder')}
              isConfirmPassword={true}
              onKeyDown={handleKeyDown}
              styles={{ inputMain: 'h-[64px]' }}
            />

            <div className="flex justify-between text-mRegualar text-neutral900">
              <div className="flex items-center gap-2">
                {' '}
                <CheckboxComponent
                  onClick={() => {
                    setIsKeepSignedIn(!isKeepSignedIn);
                  }}
                  isChecked={isKeepSignedIn}
                />{' '}
                <p>{ManageLocales('app.login.keepSignedIn')}</p>
              </div>
              <Link href={'/v2/forgot-password?path=login'}>
                {ManageLocales('app.login.forgotPassword')}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <IndividualActionButton
              variant={'primary'}
              size={'custom'}
              className="rounded-[4px] w-[100%]"
              type={'submit'}
            >
              {ManageLocales('app.login')}
            </IndividualActionButton>

            <IndividualActionButton
              onClick={() => {
                pathName === 'register'
                  ? router.back()
                  : router.push('/v2/register?path=login');
              }}
              variant={'secondary'}
              size={'custom'}
              className="border-none w-[100%]"
              type="button"
            >
              <div className="text-mMedium font-medium flex">
                <p className="text-neutral600">
                  {ManageLocales('app.login.newUser')}
                </p>{' '}
                &nbsp;
                <p className="text-neutral900">
                  {ManageLocales('app.register')}
                </p>
              </div>
            </IndividualActionButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginComponent;
