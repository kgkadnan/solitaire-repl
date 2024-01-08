'use client';
import React, { useEffect, useState } from 'react';
import {
  useGetAuthDataQuery,
  useVerifyLoginMutation
} from '@/features/api/login';
import { useRouter } from 'next/navigation';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Select from 'react-select';
import useUser from '@/lib/use-auth';
import { isEmailValid } from '@/utils/validate-email';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import ErrorModel from '@/components/common/error-model';
import countryCode from '../../constants/country-code.json';
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
import { computeCountryDropdownField } from '../my-account/kyc/helper/compute-country-dropdown';
import { handleOTPSelectChange } from '@/components/otp-verication/helpers/handle-otp-select-change';
import { countryCodeSelectStyle } from '../my-account/kyc/styles/country-code-select-style';
import { ManageLocales } from '@/utils/translate';
import { handleOTPChange } from '@/components/otp-verication/helpers/handle-otp-change';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { handleEditMobileNumber } from '@/components/otp-verication/helpers/handle-edit-mobile-number';
import { CustomInputDialog } from '@/components/common/input-dialog';
import { FloatingLabelInput } from '@/components/common/floating-input';
import {
  useSendOtpMutation,
  useVerifyOTPMutation
} from '@/features/api/otp-verification';
import Link from 'next/link';
import ConfirmScreen from '@/components/common/confirmation-screen';

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
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const router = useRouter();
  const { isTokenChecked, authToken, userLoggedIn } = useUser();

  const [token, setToken] = useState('');
  const { data } = useGetAuthDataQuery(token);

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
          .catch(e => {
            setIsDialogOpen(true);
            setDialogContent(
              <ErrorModel
                content={e.data.message}
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
            content={INCORRECT_LOGIN_CREDENTIALS}
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
      } else if (res.data.access_token) {
        setToken(res.data.access_token);
      }
    } else if (!password.length && !emailAndNumber.length) {
      setPasswordErrorText(ENTER_PASSWORD);
      setEmailErrorText(INVALID_EMAIL_FORMAT);
    } else if (!password.length) {
      setPasswordErrorText(ENTER_PASSWORD);
    } else if (!emailAndNumber.length) {
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
        <div className="flex text-center justify-between  w-[350px]">
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
                otpVerificationFormErrors.countryCode
              )}
              value={{
                label: otpVerificationFormState.countryCode,
                value: otpVerificationFormState.countryCode
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
              value={otpVerificationFormState.mobileNumber}
              errorText={otpVerificationFormErrors.mobileNumber}
            />
          </div>
        </div>
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
                otpVerificationFormState,
                setOTPVerificationFormErrors,
                setOTPVerificationFormState,
                setIsInputDialogOpen
              });
            }}
          />
        </div>
      </div>
    );
  };

  const rednerLoginContent = () => {
    switch (currentState) {
      case 'login':
        return (
          <LoginComponent
            setEmailAndNumber={setEmailAndNumber}
            isEmailValid={isEmailValid}
            setEmailErrorText={setEmailErrorText}
            setErrorText={setErrorText}
            setPasswordErrorText={setPasswordErrorText}
            setPassword={setPassword}
            setIsError={setIsError}
            handleKeyDown={handleKeyDown}
            emailAndNumber={emailAndNumber}
            emailErrorText={emailErrorText}
            password={password}
            passwordErrorText={passwordErrorText}
            handleLogin={handleLogin}
            isError={isError}
            errorText={errorText}
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
            router={router}
            phoneToken={phoneToken}
            userLoggedIn={userLoggedIn}
            setIsInputDialogOpen={setIsInputDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            verifyOTP={verifyOTP}
            setResendTimer={setResendTimer}
          />
        );
      case 'successfullyCreated':
        return (
          <ConfirmScreen
            buttons={
              <>
                <div className="flex flex-col justify-center bg-transparent  border-2 border-solitaireQuaternary w-[500px] h-[54px] cursor-pointer">
                  <Link
                    href={'/'}
                    className="text-[16px] font-medium text-solitaireTertiary"
                  >
                    {ManageLocales('app.successfullyCreated.exploreWebsite')}
                  </Link>
                </div>
                <div className="flex flex-col justify-center bg-solitaireQuaternary w-[500px] h-[54px] cursor-pointer">
                  <Link
                    href={'/my-account/kyc'}
                    className="text-[16px] font-medium text-solitaireTertiary"
                  >
                    {ManageLocales('app.successfullyCreated.finishKYCProcess')}
                  </Link>
                </div>
              </>
            }
            message={'Your account has been successfully created!'}
          />
        );
    }
  };

  // JSX rendering for the Login component
  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <UserAuthenticationLayout formData={rednerLoginContent()} />
    </>
  );
};

export default Login;
