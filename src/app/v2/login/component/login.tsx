import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import React from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { handleLoginInputChange } from '../helpers/handle-login-input-change';
import Link from 'next/link';
import { MobileInput } from '@/components/v2/common/input-field/mobile';

const LoginComponent = ({
  setEmailAndNumber,
  isEmailValid,
  setEmailErrorText,
  setErrorText,
  setPasswordErrorText,
  setPassword,
  setIsError,
  handleKeyDown,
  emailAndNumber,
  emailErrorText,
  password,
  passwordErrorText,
  handleLogin,
  isError,
  errorText
}: any) => {
  return (
    <div className='flex items-center text-center'>
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
      {/* <MobileInput
          label={ManageLocales('app.register.mobileNumber')}
          onChange={event =>
            handleLoginInputChange({
              event,
              type: 'email',
              setEmailAndNumber,
              isEmailValid,
              setEmailErrorText,
              setErrorText,
              setPasswordErrorText,
              setPassword,
              setIsError
            })
          }
          type="number"
          name="mobileNumber"
          // value={registerFormState.mobileNumber}
          // errorText={registerFormErrors.mobileNumber}
          // registerFormState={registerFormState}
          // setRegisterFormState={setRegisterFormState}
          placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
        /> */}
        <FloatingLabelInput
          label={ManageLocales('app.login.emailAndNumber')}
          onChange={event =>
            handleLoginInputChange({
              event,
              type: 'email',
              setEmailAndNumber,
              isEmailValid,
              setEmailErrorText,
              setErrorText,
              setPasswordErrorText,
              setPassword,
              setIsError
            })
          }
          type="email"
          name="email"
          onKeyDown={handleKeyDown}
          value={emailAndNumber}
          errorText={emailErrorText}
        />
        <FloatingLabelInput
          label={ManageLocales('app.login.password')}
          onChange={event =>
            handleLoginInputChange({
              event,
              type: 'password',
              setEmailAndNumber,
              isEmailValid,
              setEmailErrorText,
              setErrorText,
              setPasswordErrorText,
              setPassword,
              setIsError
            })
          }
          type="password"
          name="password"
          onKeyDown={handleKeyDown}
          value={password}
          errorText={passwordErrorText}
          showPassword={true}
        />

      <div>
        <div className="flex justify-center items-center text-sm sm:text-base h-10">
          {isError && (
            <div className="text-solitaireError flex text-left">
              {errorText}
            </div>
          )}
        </div>

        <CustomDisplayButton
          displayButtonLabel={ManageLocales('app.login')}
          displayButtonAllStyle={{
            displayButtonStyle: 'bg-solitaireQuaternary w-full h-14 mb-10', // Adjust height as needed
            displayLabelStyle: 'text-solitaireTertiary text-base font-medium'
          }}
          handleClick={handleLogin}
        />
      </div>

      <div>
        <Link
          href={'/forgot-password'}
          className="text-lg text-solitaireQuaternary font-medium"
        >
          {ManageLocales('app.login.forgotPassword')}
        </Link>
        <div className="mt-5">
          <p className="text-solitaireTertiary text-lg font-light">
            {ManageLocales('app.login.newUser')}
            <Link
              href={'/register'}
              className="text-solitaireQuaternary font-medium"
            >
              {ManageLocales('app.login.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginComponent;
