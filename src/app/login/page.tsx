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

// Define the Login component
const Login = () => {
  // State variables for email, password, and error handling
  const [emailAndNumber, setEmailAndNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyLogin] = useVerifyLoginMutation();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const [emailErrorText, setEmaailErrorText] = useState<string>('');
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
      if (res.error) {
        // Display error message if login fails
        setIsError(true);
        setErrorText(res.error.data.message);
      } else {
        // Redirect to home page if login is successful
        if (res.data.customer) {
          localStorage.removeItem('Search');
          router.push('/');
        }
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate phone number format
  const isPhoneNumberValid = (number: string) => {
    const phoneRegex = /^(?:\+\d{1,3})?\d{1,15}$/;
    return phoneRegex.test(number);
  };

  // Handle input changes for email
  const handleEmailInput = (e: any) => {
    const enteredEmailAndNumber = e.target.value;
    setEmailAndNumber(enteredEmailAndNumber);

    // Check if the entered email is valid2
    if (
      isEmailValid(enteredEmailAndNumber) ||
      isPhoneNumberValid(enteredEmailAndNumber)
    ) {
      setEmaailErrorText('');
      setErrorText('');
    } else {
      setEmaailErrorText('Please enter a valid email or phone number');
      setErrorText('');
    }
  };

  // Handle input changes for password
  const handlePasswordInput = (e: any) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // Check if the entered password is valid
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[\w!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/;

    if (passwordRegex.test(enteredPassword)) {
      setIsError(false);
      setErrorText('');
      setPasswordErrorText('');
    } else {
      setPasswordErrorText(
        'Password must exceed 8 characters and contain at least one uppercase letter, one lowercase letter, one numeral, and one special character'
      );
    }
  };

  // JSX rendering for the Login component
  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[20px] text-left mb-[40px]">
            <Image src={handImage} alt="Banner image" />
            <CustomInputlabel
              htmlfor={''}
              label={'Login'}
              overriddenStyles={{
                label: 'text-solitaireQuaternary text-[48px] font-semibold'
              }}
            />
            <div className="">
              <p className="text-solitaireTertiary">
                Welcome back! Please login to your account
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">
            <FloatingLabelInput
              label="Email / Mobile Number"
              onChange={handleEmailInput}
              type="email"
              name="email"
              onKeyDown={handleKeyDown}
              value={emailAndNumber}
              errorText={emailErrorText}
            />
            {/* Input field for password */}
            <FloatingLabelInput
              label="Password"
              onChange={handlePasswordInput}
              type="Password"
              name="Password"
              onKeyDown={handleKeyDown}
              value={password}
              errorText={passwordErrorText}
            />

            <div>
              {/* Display error message if there is an error */}
              <div className="h-6 mb-3">
                {isError ? (
                  <div className="text-red-600 flex text-left">{errorText}</div>
                ) : (
                  ''
                )}
              </div>
              {/* Button to trigger the login action */}

              <CustomDisplayButton
                displayButtonLabel={'Login'}
                displayButtonAllStyle={{
                  displayButtonStyle: 'bg-[#9f8b75] w-[500px] h-[64px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={handleLogin}
              />
            </div>

            <div className="">
              <Link href={''} className="text-[18px] font-medium">
                Forgot Password?
              </Link>
              <div className="mt-[20px]">
                <p className="text-solitaireTertiary text-[18px] font-light">
                  New User ?{' '}
                  <Link
                    href={''}
                    className="text-solitaireQuaternary font-medium"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Login;
