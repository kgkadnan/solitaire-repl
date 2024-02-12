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
import OTPVerification from '@/components/otp-verication';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/otp-verication/hooks/otp-verification-state-management';
import { ManageLocales } from '@/utils/translate';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { handleEditMobileNumber } from '@/components/otp-verication/helpers/handle-edit-mobile-number';
import { CustomInputDialog } from '@/components/common/input-dialog';
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
    country_code: string;
    mobileNumber: string;
  }>({ country_code: '91', mobileNumber: '' });
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

  const {
    otpValues,
    resendTimer,
    otpVerificationFormState
    // otpVerificationFormErrors
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
          codeAndNumber: `${data.customer.country_code} ${data.customer.phone}`
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
  // Handle the login logic
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
        country_code: phoneNumber.country_code
      });

      if (res?.error?.status === statusCode.UNAUTHORIZED) {
        // Display error message if login fails
        setIsDialogOpen(true);
        setDialogContent(
          <InvalidCreds
            content={INCORRECT_LOGIN_CREDENTIALS}
            handleClick={() => setIsDialogOpen(false)}
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

  // Function to validate phone number format
  // const isPhoneNumberValid = (number: string) => {
  //   const phoneRegex = PHONE_REGEX;
  //   return phoneRegex.test(number);
  // };

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p> Change Mobile Number</p>
        </div>
        {/* <div className="flex text-center justify-between  w-[350px]">
          <div className="w-[25%]">
            <Select
              name="countryCode"
              options={computeCountryDropdownField(countryCode)}
              onChange={selectValue =>
                handleOTPSelectChange({
                  selectValue,
                  setOTPVerificationFormState
                })
              }
              styles={countryCodeSelectStyle(
                otpVerificationFormErrors.otpCountryCode
              )}
              value={{
                label: otpVerificationFormState.otpCountryCode,
                value: otpVerificationFormState.otpCountryCode
              }}
            />
          </div>

          <div className="w-[70%]">
            <FloatingLabelInput
              label={ManageLocales('app.register.mobileNumber')}
              onChange={event =>
                handleOTPChange({ event, setOTPVerificationFormState })
              }
              type="number"
              name="mobileNumber"
              value={otpVerificationFormState.otpMobileNumber}
              errorText={otpVerificationFormErrors.otpMobileNumber}
            />
          </div>
        </div> */}
        <div className="flex justify-center  gap-5">
          {/* Button to trigger the register action */}

          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.cancel')}
            displayButtonAllStyle={{
              displayButtonStyle:
                ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              setOTPVerificationFormState(prev => ({ ...prev }));
              setOTPVerificationFormErrors(initialOTPFormState);
              setIsInputDialogOpen(false);
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.save')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
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
          />
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
            state={'login'}
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
      <CustomInputDialog
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
