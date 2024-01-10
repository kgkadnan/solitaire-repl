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
import { handleEditMobileNumber } from '@/components/otp-verication/helpers/handle-edit-mobile-number';
import { CustomInputDialog } from '@/components/common/input-dialog';
import { FloatingLabelInput } from '@/components/common/floating-input';
import {
  useSendOtpMutation,
  useVerifyOTPMutation
} from '@/features/api/otp-verification';
import Link from 'next/link';
import ConfirmScreen from '@/components/common/confirmation-screen';
import { statusCode } from '@/constants/enums/status-code';
import { AuthDataResponse } from './interface';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyLogin] = useVerifyLoginMutation();
  const router = useRouter();

  const [token, setToken] = useState('');
  const { data }: { data?: AuthDataResponse } = useGetAuthDataQuery(token, {
    skip: !token
  });

  const [currentState, setCurrentState] = useState('login');
  const [phoneToken, setPhoneToken] = useState('');

  const [verifyOTP] = useVerifyOTPMutation();
  const [sendOtp] = useSendOtpMutation();

  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();

  const {
    otpValues,
    resendTimer,
    otpVerificationFormState,
    otpVerificationFormErrors
  } = otpVericationState;
  const {
    setOtpValues,
    setResendTimer,
    setOTPVerificationFormState,
    setOTPVerificationFormErrors
  } = otpVerificationSetState;

  useEffect(() => {
    if (isTokenChecked) {
      authToken && router.push('/');
    }
  }, [isTokenChecked]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      if (data.customer.is_phone_verified) {
        userLoggedIn(token);
        router.push('/');
      } else {
        setCurrentState('otpVerification');
        setOTPVerificationFormState(prev => ({
          ...prev,
          mobileNumber: `${data.customer.phone}`,
          countryCode: `${data.customer.country_code}`,
          codeAndNumber: `${data.customer.country_code} ${data.customer.phone}`
        }));
        sendOtp({
          phone: data.customer.phone,
          country_code: data.customer.country_code
        })
          .unwrap()
          .then(res => {
            setPhoneToken(res.token);
          })
          .catch(_e => {
            setIsDialogOpen(true);
            setDialogContent(
              <ErrorModel
                content={_e.data.message}
                handleClick={() => setIsDialogOpen(false)}
              />
            );
          });
      }
    }
  }, [data]);
  // Handle the login logic
  const handleLogin = async () => {
    let res: any = await verifyLogin({ email: email, password: password });
    if (res.data.customer) {
      localStorage.removeItem('Search');
      router.push('/');
    }
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
          onChange={e => setEmail(e.target.value)}
        />
        <CustomInputField
          type={'password'}
          name={'password'}
          placeholder="Password"
          style={{ input: styles.input, inputMain: styles.inputContainer }}
          onChange={e => setPassword(e.target.value)}
        />
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
