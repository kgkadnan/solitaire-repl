'use client'
import React, { useState } from 'react';
import login from '@public/assets/images/login-screen.png';
import Image, { StaticImageData } from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomInputField } from '@/components/common/input-field';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import styles from './login.module.scss';
import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import { useVerifyLoginMutation } from '@/features/api/login';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [verifyLogin, { data, error, isLoading }] = useVerifyLoginMutation();
  const router = useRouter();

const handleLogin=async()=>{

  
 await verifyLogin({email:email,password:password})
 if(data) { router.push('/') }

}
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
          gap: '20px',
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
          onChange={(e)=>setEmail(e.target.value)}
        />
        <CustomInputField
          type={'password'}
          name={'password'}
          placeholder="Password"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <CustomDisplayButton
          displayButtonLabel={'Login'}
          displayButtonAllStyle={{
            displayButtonStyle: styles.loginButton,
            displayLabelStyle: styles.loginButtonText,
          }}
          handleClick={handleLogin}
        />
      </div>
    </div>
  );
};
export default Login;
