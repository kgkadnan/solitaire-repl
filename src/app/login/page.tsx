'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useVerifyLoginMutation } from '@/features/api/login';
import { useRouter } from 'next/navigation';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { FloatingLabelInput } from '@/components/common/floating-input';
import Link from 'next/link';
import { ManageLocales } from '@/utils/translate';
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants/validation-regex/regex';

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
  const router = useRouter();

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

      console.log(res);

      if (res?.error?.originalStatus === 401) {
        // Display error message if login fails
        setIsError(true);
        setErrorText('Incorrect login credential');
      } else if (res.error) {
        setIsError(true);
        setErrorText(res.error.data.message);
      } else {
        // Redirect to home page if login is successful
        if (res.data.customer) {
          localStorage.removeItem('Search');
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

  // Function to validate email format
  const isEmailValid = (email: string) => {
    // Regular expression for basic email validation
    const emailRegex = EMAIL_REGEX;
    return emailRegex.test(email);
  };

  // Function to validate phone number format
  const isPhoneNumberValid = (number: string) => {
    const phoneRegex = PHONE_REGEX;
    return phoneRegex.test(number);
  };

  const handleInputChange = (e: any, type: string) => {
    const inputValue = e.target.value;

    if (type === 'email') {
      setEmailAndNumber(inputValue);

      if (isEmailValid(inputValue) || isPhoneNumberValid(inputValue)) {
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
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[8px] mb-[40px] items-center">
            <Image src={handImage} alt="Banner image" />
            <div>
              <CustomInputlabel
                htmlfor={''}
                label={ManageLocales('app.login')}
                overriddenStyles={{
                  label: 'text-solitaireQuaternary text-[48px] font-semibold'
                }}
              />
            </div>

            <div className="">
              <p className="text-solitaireTertiary text-[16px]">
                {ManageLocales('app.login.welcomeMessage')}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[30px]">
            <FloatingLabelInput
              label={ManageLocales('app.login.emailAndNumber')}
              onChange={e => handleInputChange(e, 'email')}
              type="email"
              name="email"
              onKeyDown={handleKeyDown}
              value={emailAndNumber}
              errorText={emailErrorText}
            />
            {/* Input field for password */}
            <FloatingLabelInput
              label={ManageLocales('app.login.password')}
              onChange={e => handleInputChange(e, 'password')}
              type="Password"
              name="Password"
              onKeyDown={handleKeyDown}
              value={password}
              errorText={passwordErrorText}
              showPassword={true}
            />
          </div>
          <div>
            {/* Display error message if there is an error */}
            <div className="flex justify-center items-center text-[16px] h-10">
              {isError ? (
                <div className="text-[#983131] flex text-left">{errorText}</div>
              ) : (
                ''
              )}
            </div>
            {/* Button to trigger the login action */}

            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.login')}
              displayButtonAllStyle={{
                displayButtonStyle:
                  'bg-solitaireQuaternary w-[500px] h-[54px] mb-[40px]',
                displayLabelStyle:
                  'text-solitaireTertiary text-[16px] font-medium'
              }}
              handleClick={handleLogin}
            />
          </div>

          <div className="">
            <Link
              href={'/forgot-password'}
              className="text-[18px] text-solitaireQuaternary font-medium"
            >
              {ManageLocales('app.login.forgotPassword')}
            </Link>
            <div className="mt-[20px]">
              <p className="text-solitaireTertiary text-[18px] font-light">
                {ManageLocales('app.login.newUser')}
                <Link
                  href={''}
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
  );
};

export default Login;
