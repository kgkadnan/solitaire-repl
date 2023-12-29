'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useVerifyLoginMutation } from '@/features/api/login';
import { useRouter } from 'next/navigation';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import KGKLogo from '@public/assets/icons/vector.svg';
import { FloatingLabelInput } from '@/components/common/floating-input';
import Link from 'next/link';
import { ManageLocales } from '@/utils/translate';
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants/validation-regex/regex';
import useUser from '@/lib/useAuth';
import { isEmailValid } from '@/utils/validate-email';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import ErrorModel from '@/components/common/error-model';

// Define the Login component
const Login = () => {
  // State variables for email, password, and error handling
  const [emailAndNumber, setEmailAndNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyLogin] = useVerifyLoginMutation();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const router = useRouter();
  const { isTokenChecked, authToken, userLoggedIn } = useUser();

  useEffect(() => {
    if (isTokenChecked) {
      authToken && router.push('/');
    }
  }, [isTokenChecked]);
  // Handle the login logic
  const handleLogin = async () => {
    if (
      !emailErrorText.length &&
      !passwordErrorText.length &&
      password.length &&
      emailAndNumber.length
    ) {
      let res: any = await verifyLogin({
        email: emailAndNumber,
        password: password
      });

      if (res?.error?.status === 401) {
        // Display error message if login fails
        setIsDialogOpen(true);
        setDialogContent(
          <ErrorModel
            content={'Incorrect login credential'}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      } else if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <ErrorModel
            content={res.error.data.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      } else {
        // Redirect to home page if login is successful
        if (res.data.access_token) {
          userLoggedIn(res.data.access_token);
          router.push('/');
        }
      }
    } else {
      // Handle both fields being empty
      if (!password.length && !emailAndNumber.length) {
        setPasswordErrorText('Please enter password');
        setEmailErrorText('Please enter email/Phone number');
      } else if (!password.length) {
        setPasswordErrorText('Please enter password');
      } else if (!emailAndNumber.length) {
        setEmailErrorText('Please enter email/Phone number');
      }
    }
  };

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Function to validate phone number format
  // const isPhoneNumberValid = (number: string) => {
  //   const phoneRegex = PHONE_REGEX;
  //   return phoneRegex.test(number);
  // };

  const handleInputChange = (e: any, type: string) => {
    const inputValue = e.target.value;

    if (type === 'email') {
      setEmailAndNumber(inputValue);

      // if (isEmailValid(inputValue) || isPhoneNumberValid(inputValue)) {
      if (isEmailValid(inputValue)) {
        setEmailErrorText('');
        setErrorText('');
      } else {
        setEmailErrorText('Please enter a valid email or phone number');
        setErrorText('');
      }
    } else if (type === 'password') {
      setPassword(inputValue);
      setIsError(false);
      setErrorText('');
      setPasswordErrorText('');
    }
  };

  // JSX rendering for the Login component
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
                onChange={e => handleInputChange(e, 'email')}
                type="email"
                name="email"
                onKeyDown={handleKeyDown}
                value={emailAndNumber}
                errorText={emailErrorText}
              />
              <FloatingLabelInput
                label={ManageLocales('app.login.password')}
                onChange={e => handleInputChange(e, 'password')}
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
                  <div className="text-red-600 flex text-left">{errorText}</div>
                )}
              </div>

              <CustomDisplayButton
                displayButtonLabel={ManageLocales('app.login')}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-solitaireQuaternary w-full h-14 mb-10', // Adjust height as needed
                  displayLabelStyle:
                    'text-solitaireTertiary text-base font-medium'
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
        }
      />
    </>
  );
};

export default Login;
