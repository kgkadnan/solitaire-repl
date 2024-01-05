import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import React from 'react';
import KGKLogo from '@public/assets/icons/vector.svg';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { handleLoginInputChange } from '../helpers/handle-login-input-change';
import Link from 'next/link';

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
    <div className="flex justify-center flex-col w-full max-w-md px-4 lg:max-w-lg xl:max-w-xl 2xl:max-w-[500px] mx-auto">
      <div className="flex flex-col gap-2 mb-[40px] items-center">
        <Image
          src={KGKLogo}
          alt="Banner image"
          style={{ width: '60px', height: '80px' }}
        />
        <div>
          <CustomInputlabel
            htmlfor={''}
            label={ManageLocales('app.login')}
            overriddenStyles={{
              label:
                'text-solitaireQuaternary text-4xl sm:text-5xl md:text-6xl font-semibold mb-4'
            }}
          />
        </div>

        <div>
          <p className="text-solitaireTertiary text-sm sm:text-base">
            {ManageLocales('app.login.welcomeMessage')}
          </p>
        </div>
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-7">
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
      </div>

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
  );
};

export default LoginComponent;
