'use client';
import React, { useState } from 'react';
import login from '@public/assets/images/login-screen.png';
import Image from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomInputField } from '@/components/common/input-field';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import styles from './login.module.scss';
import { useVerifyLoginMutation } from '@/features/api/login';
import { useRouter } from 'next/navigation';

// Define the Login component
const Login = () => {
  // State variables for email, password, and error handling
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyLogin] = useVerifyLoginMutation();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const router = useRouter();

  // Handle the login logic
  const handleLogin = async () => {
<<<<<<< Updated upstream
    let res: any = await verifyLogin({ email: email, password: password });
    if (res.error) {
      // Display error message if login fails
      setIsError(true);
      setErrorText(res.error.data.message);
=======
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
>>>>>>> Stashed changes
    } else {
      // Redirect to home page if login is successful
      if (res.data.customer) {
        localStorage.removeItem('Search');
        router.push('/');
      }
    }
  };

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Handle input changes for email
  const handleEmailInput = (e: any) => {
    setEmail(e.target.value);
    setIsError(false);
    setErrorText('');
  };

  // Handle input changes for password
  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value);
    setIsError(false);
    setErrorText('');
  };

  // JSX rendering for the Login component
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <Image
          src={login}
          alt={'login'}
          style={{ width: '60vw', height: '100vh' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40vw',
          backgroundColor: 'black',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Custom label for the Login section */}
        <CustomInputlabel
          htmlfor={''}
          label={'Login'}
          overriddenStyles={{ label: styles.labelStyles }}
        />
        {/* Input field for email */}
        <CustomInputField
          type={'email'}
          name={'email'}
          placeholder="Email"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={handleEmailInput}
          onKeyDown={handleKeyDown}
        />
        {/* Input field for password */}
        <CustomInputField
          type={'password'}
          name={'password'}
          placeholder="Password"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={handlePasswordInput}
          onKeyDown={handleKeyDown}
        />
        {/* Display error message if there is an error */}
        <div className="h-6">
          {isError ? <div className="text-red-600">{errorText}</div> : ''}
        </div>
        {/* Button to trigger the login action */}
        <CustomDisplayButton
          displayButtonLabel={'Login'}
          displayButtonAllStyle={{
            displayButtonStyle: styles.loginButton,
            displayLabelStyle: styles.loginButtonText
          }}
          handleClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
