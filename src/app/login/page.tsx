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

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyLogin] = useVerifyLoginMutation();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    let res: any = await verifyLogin({ email: email, password: password });
    if (res.error) {
      setIsError(true);
      setErrorText(res.error.data.message);
    } else {
      if (res.data.customer) {
        localStorage.removeItem('Search');
        router.push('/');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleEmailInput = (e: any) => {
    setEmail(e.target.value);
    setIsError(false);
    setErrorText('');
  };

  const handlePasswordInput = (e: any) => {
    setPassword(e.target.value);
    setIsError(false);
    setErrorText('');
  };

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
        <CustomInputlabel
          htmlfor={''}
          label={'Login'}
          overriddenStyles={{ label: styles.labelStyles }}
        />
        <CustomInputField
          type={'email'}
          name={'email'}
          placeholder="Email"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={handleEmailInput}
          onKeyDown={handleKeyDown}
        />
        <CustomInputField
          type={'password'}
          name={'password'}
          placeholder="Password"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={handlePasswordInput}
          onKeyDown={handleKeyDown}
        />
        <div className="h-6">
          {isError ? <div className="text-red-600">{errorText}</div> : ''}
        </div>

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
