import Image from 'next/image';
import React, { useState } from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { handleLoginInputChange } from '../helpers/handle-login-input-change';
import Link from 'next/link';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { PasswordField } from '@/components/v2/common/input-field/password';
import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginComponent = ({
  setPhoneNumber,
  isPhoneNumberValid,
  setEmailErrorText,
  // setErrorText,
  setPasswordErrorText,
  setPassword,
  // setIsError,
  handleKeyDown,
  phoneNumber,
  emailErrorText,
  password,
  passwordErrorText,
  handleLogin
}: any) => {
  const [isKeepSignedIn, setIsKeepSignedIn] = useState(false);
  const router = useRouter();
  const pathName = useSearchParams().get('path');

  return (
    <div className="flex items-center text-center">
      <div className="flex flex-col w-[450px]  p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral-200 ">
        <div className="flex flex-col items-center">
          <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />
        </div>
        <div className="parent relative">
          <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
        </div>

        <div className="text-headingM text-neutral-900 font-medium text-left">
          {ManageLocales('app.login')}
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-5">
          <MobileInput
            label={ManageLocales('app.register.mobileNumber')}
            onChange={event =>
              handleLoginInputChange({
                event,
                type: 'phone',
                setPhoneNumber,
                isPhoneNumberValid,
                setEmailErrorText,
                // setErrorText,
                setPasswordErrorText,
                setPassword
                // setIsError
              })
            }
            type="number"
            name="mobileNumber"
            // value={registerFormState.mobileNumber}
            errorText={emailErrorText}
            // registerFormState={registerFormState}
            // setRegisterFormState={setRegisterFormState}
            placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
            registerFormState={phoneNumber}
            setRegisterFormState={setPhoneNumber}
            value={phoneNumber.mobileNumber}
            onKeyDown={handleKeyDown}
          />
          <PasswordField
            label={ManageLocales('app.register.password')}
            onChange={event =>
              handleLoginInputChange({
                event,
                type: 'password',
                setPhoneNumber,
                isPhoneNumberValid,
                setEmailErrorText,
                // setErrorText,
                setPasswordErrorText,
                setPassword
                // setIsError
              })
            }
            name="password"
            value={password}
            errorText={passwordErrorText}
            placeholder={ManageLocales('app.login.password.placeholder')}
            isConfirmPassword={true}
            onKeyDown={handleKeyDown}
          />

          {/* <div className="flex justify-center items-center text-sm sm:text-base h-10">
            {isError && (
              <div className="text-solitaireError flex text-left">
                {errorText}
              </div>
            )}
          </div> */}

          <div className="flex justify-between text-mRegualar text-neutral-900">
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
            onClick={handleLogin}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%]"
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
          >
            <div className="text-mMedium font-medium flex">
              <p className="text-neutral-600">
                {ManageLocales('app.login.newUser')}
              </p>{' '}
              &nbsp;
              <p className="text-neutral-900">
                {ManageLocales('app.register')}
              </p>
            </div>
          </IndividualActionButton>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default LoginComponent;
