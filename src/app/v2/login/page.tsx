'use client';
import React, { useEffect, useState } from 'react';
import {
  useGetAuthDataQuery,
  useVerifyLoginMutation
} from '@/features/api/login';
import { useRouter } from 'next/navigation';
import useUser from '@/lib/use-auth';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import {
  ENTER_PASSWORD,
  INCORRECT_LOGIN_CREDENTIALS,
  INVALID_EMAIL_FORMAT
} from '@/constants/error-messages/register';
import { Events } from '@/constants/enums/event';
import LoginComponent from './component/login';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/otp-verication/hooks/otp-verification-state-management';
import {
  useSendOtpMutation,
  useVerifyOTPMutation,
  useVerifyPhoneQuery
} from '@/features/api/otp-verification';
import { statusCode } from '@/constants/enums/status-code';
import { IAuthDataResponse } from './interface';
import { DialogComponent } from '@/components/v2/common/dialog';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import ConfirmScreen from '../register/component/confirmation-screen';
import { isPhoneNumberValid } from '@/utils/validate-phone';
import InvalidCreds from './component/invalid-creds';
import OTPVerification from '@/components/v2/common/otp-verication';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import editIcon from '@public/v2/assets/icons/modal/edit.svg';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { handleEditMobileNumber } from '@/components/v2/common/otp-verication/helpers/handle-edit-mobile-number';
import Image from 'next/image';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { handleOTPChange } from '@/components/v2/common/otp-verication/helpers/handle-otp-change';
import { ManageLocales } from '@/utils/v2/translate';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';

export interface IToken {
  token: string;
  phoneToken: string;
  tempToken: string;
}

const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};

// Define the Login component
const Login = () => {
  // State variables for email, password, and error handling
  const [phoneNumber, setPhoneNumber] = useState<{
    countryCode: string;
    mobileNumber: string;
  }>({ countryCode: '', mobileNumber: '' });
  const [password, setPassword] = useState<string>('');

  const [token, setToken] = useState(initialTokenState);
  const { data }: { data?: IAuthDataResponse } = useGetAuthDataQuery(
    token.token,
    { skip: !token.token }
  );
  const [verifyLogin] = useVerifyLoginMutation();

  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const router = useRouter();
  const { isTokenChecked, authToken, userLoggedIn } = useUser();

  const [currentState, setCurrentState] = useState('login');

  const [verifyOTP] = useVerifyOTPMutation();
  const [sendOtp] = useSendOtpMutation();

  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { data: currentCountryCode, error } = useGetCountryCodeQuery({});
  useEffect(() => {
    if (currentCountryCode) {
      setPhoneNumber((prev: any) => ({
        ...prev,
        countryCode: currentCountryCode.country_calling_code.replace('+', '')
      }));
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [currentCountryCode, error]);
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

  const { data: verifyNumber } = useVerifyPhoneQuery({
    country_code: otpVerificationFormState.otpCountryCode,
    phone_number: otpVerificationFormState.otpMobileNumber
  });

  useEffect(() => {
    if (isTokenChecked) {
      authToken && router.push('/');
    }
  }, [isTokenChecked]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      if (data.customer.is_phone_verified) {
        userLoggedIn(token.token);
        router.push('/');
      } else {
        setCurrentState('otpVerification');
        setOTPVerificationFormState(prev => ({
          ...prev,
          otpMobileNumber: `${data.customer.phone}`,
          otpCountryCode: `${data.customer.country_code}`,
          codeAndNumber: `+${data.customer.country_code} ${data.customer.phone}`
        }));
        sendOtp({
          phone: data.customer.phone,
          country_code: data.customer.country_code
        })
          .unwrap()
          .then(res => {
            setToken((prev: any) => ({
              ...prev,
              phoneToken: res?.token || ''
            }));
          })
          .catch(_e => {
            setIsDialogOpen(true);
            setDialogContent(
              <InvalidCreds
                content={_e.data.message}
                handleClick={() => setIsDialogOpen(false)}
              />
            );
          });
      }
    }
  }, [data]);

  const handleLogin = async () => {
    if (
      !emailErrorText.length &&
      !passwordErrorText.length &&
      password.length &&
      phoneNumber.mobileNumber.length
    ) {
      let res: any = await verifyLogin({
        phone: phoneNumber.mobileNumber,
        password: password,
        country_code: phoneNumber.countryCode
      });
      if (res?.error?.status === statusCode.UNAUTHORIZED) {
        // Display error message if login fails
        setIsDialogOpen(true);
        setDialogContent(
          <InvalidCreds
            content={INCORRECT_LOGIN_CREDENTIALS}
            handleClick={() => setIsDialogOpen(false)}
            header="Login Failed"
          />
        );
      } else if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <InvalidCreds
            content={res.error.data.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      } else if (res.data.access_token) {
        setToken((prev: any) => ({
          ...prev,
          token: res.data.access_token,
          tempToken: res.data.access_token
        }));
      } else if (res.data.customer.phone_token) {
        setCurrentState('otpVerification');
        setToken((prev: any) => ({
          ...prev,
          phoneToken: res.data.customer.phone_token,
          tempToken: res.data.customer.temp_token
        }));
      }
    } else if (!password.length && !phoneNumber.mobileNumber.length) {
      setPasswordErrorText(ENTER_PASSWORD);
      setEmailErrorText(INVALID_EMAIL_FORMAT);
    } else if (!password.length) {
      setPasswordErrorText(ENTER_PASSWORD);
    } else if (!phoneNumber.mobileNumber.length) {
      setEmailErrorText(INVALID_EMAIL_FORMAT);
    }
  };
  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Events.ENTER) {
      handleLogin();
    }
  };

  const renderContentWithInput = () => {
    return (
      <div className="flex gap-[12px] flex-col w-full">
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={editIcon} alt="update phone number" />
        </div>
        <div className="flex gap-[12px] flex-col mt-[80px] align-left">
          <p className="text-headingS text-neutral-900 font-medium">
            Enter new mobile number
          </p>
        </div>
        <MobileInput
          label={ManageLocales('app.register.mobileNumber')}
          onChange={event =>
            handleOTPChange({ event, setOTPVerificationFormState })
          }
          type="number"
          name="otpMobileNumber"
          errorText={otpVerificationFormErrors.otpMobileNumber}
          placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
          registerFormState={otpVerificationFormState}
          setRegisterFormState={setOTPVerificationFormState}
          value={otpVerificationFormState.otpMobileNumber}
          onKeyDown={handleKeyDown}
        />

        <div className="flex justify-between gap-[12px]">
          <IndividualActionButton
            onClick={() => {
              setOTPVerificationFormState(prev => ({ ...prev }));
              setOTPVerificationFormErrors(initialOTPFormState);
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[170px]"
          >
            {ManageLocales('app.OTPVerification.cancel')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              handleEditMobileNumber({
                verifyNumber,
                otpVerificationFormState,
                setOTPVerificationFormErrors,
                setOTPVerificationFormState,
                setIsInputDialogOpen,
                setIsDialogOpen,
                setDialogContent,
                sendOtp,
                setToken
              });
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[170px]"
          >
            {ManageLocales('app.OTPVerification.save')}
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  const renderLoginContent = () => {
    switch (currentState) {
      case 'login':
        return (
          <LoginComponent
            setPhoneNumber={setPhoneNumber}
            isPhoneNumberValid={isPhoneNumberValid}
            setEmailErrorText={setEmailErrorText}
            // setErrorText={setErrorText}
            setPasswordErrorText={setPasswordErrorText}
            setPassword={setPassword}
            // setIsError={setIsError}
            handleKeyDown={handleKeyDown}
            phoneNumber={phoneNumber}
            emailErrorText={emailErrorText}
            password={password}
            passwordErrorText={passwordErrorText}
            handleLogin={handleLogin}
            // isError={isError}
            // errorText={errorText}
          />
        );
      case 'otpVerification':
        return (
          <OTPVerification
            otpVerificationFormState={otpVerificationFormState}
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            sendOtp={sendOtp}
            resendTimer={resendTimer}
            setCurrentState={setCurrentState}
            token={token}
            userLoggedIn={userLoggedIn}
            setIsInputDialogOpen={setIsInputDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            verifyOTP={verifyOTP}
            setToken={setToken}
            setResendTimer={setResendTimer}
            role={'login'}
          />
        );
      case 'successfullyCreated':
        return <ConfirmScreen />;
    }
  };

  // JSX rendering for the Login component
  return (
    <>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <UserAuthenticationLayout
        formData={renderLoginContent()}
        screen={currentState}
      />
    </>
  );
};

export default Login;
