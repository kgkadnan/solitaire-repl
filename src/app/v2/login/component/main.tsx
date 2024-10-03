'use client';
import React, { useEffect, useState } from 'react';
import {
  useGetAuthDataQuery,
  useVerifyLoginMutation
} from '@/features/api/login';
import { useRouter } from 'next/navigation';
import useUser from '@/lib/use-auth';
import {
  ENTER_PASSWORD,
  ENTER_PHONE,
  INVALID_EMAIL_FORMAT,
  INVALID_MOBILE
} from '@/constants/error-messages/register';
import { Events } from '@/constants/enums/event';
import {
  useSendEmailResetOtpMutation,
  useSendOtpMutation,
  useVerifyOTPMutation
} from '@/features/api/otp-verification';
import { DialogComponent } from '@/components/v2/common/dialog';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import { isPhoneNumberValid } from '@/utils/validate-phone';
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
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { IAuthDataResponse } from '../interface';
import CommonPoppup from './common-poppup';
import LoginComponent from './login';
import ConfirmScreen from '../../register/component/confirmation-screen';
import { isEmailValid } from '@/utils/validate-email';
import EmailVerification from '@/components/v2/common/email-verification';
import { InputField } from '@/components/v2/common/input-field';
import { handleLoginInputChange } from '../helpers/handle-login-input-change';

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
    iso: string;
  }>({ countryCode: '', mobileNumber: '', iso: '' });
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailToken, setEmailToken] = useState<string>('');
  const [tempToken, setTempToken] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [loginByEmail, setLoginByEmail] = useState<boolean>(false);
  const [token, setToken] = useState(initialTokenState);
  const { data }: { data?: IAuthDataResponse } = useGetAuthDataQuery(
    token.token,
    { skip: !token.token }
  );
  const [verifyLogin] = useVerifyLoginMutation();
  const [resendEmailOTP] = useSendEmailResetOtpMutation();

  const [phoneErrorText, setPhoneErrorText] = useState<string>('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [tempEmail, setTempEmail] = useState<string>('');
  const [tempEmailError, setTempEmailError] = useState<string>('');
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
    const userIp = JSON.parse(localStorage.getItem('userIp')!);

    if (userIp) {
      setPhoneNumber((prev: any) => ({
        ...prev,
        countryCode: userIp.countryCode,
        iso: userIp?.iso
      }));
      setOTPVerificationFormState({
        ...otpVerificationFormState,
        countryCode: userIp.countryCode,
        iso: userIp?.iso
      });
    } else if (currentCountryCode) {
      setPhoneNumber((prev: any) => ({
        ...prev,
        countryCode: currentCountryCode.country_calling_code.replace('+', ''),
        iso: currentCountryCode?.country
      }));
      setOTPVerificationFormState({
        ...otpVerificationFormState,
        countryCode: currentCountryCode.country_calling_code.replace('+', ''),
        iso: currentCountryCode?.country
      });
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

  useEffect(() => {
    if (isTokenChecked) {
      authToken && router && router.push('/v2/');
    }
  }, [isTokenChecked]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem(
        'userIp',
        JSON.stringify({
          countryCode: phoneNumber?.countryCode,
          iso: phoneNumber?.iso
        })
      );
      if (data.customer.is_phone_verified) {
        localStorage.removeItem('Search');
        localStorage.removeItem('MatchingPair');

        userLoggedIn(token.token);
        router && router.push('/v2/');
      } else {
        setCurrentState('otpVerification');
        setOTPVerificationFormState(prev => ({
          ...prev,
          otpMobileNumber: `${data.customer.phone}`,
          countryCode: `${data.customer.country_code}`,
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
              <CommonPoppup
                header={_e.data.message}
                handleClick={() => setIsDialogOpen(false)}
                content={''}
                buttonText="Try Again"
              />
            );
          });
      }
    }
  }, [data]);

  const handleLogin = async () => {
    setIsLoading(true);
    if (
      ((isPhoneNumberValid(phoneNumber.mobileNumber) &&
        !loginByEmail &&
        phoneNumber.mobileNumber.length) ||
        (isEmailValid(email) && email.length && loginByEmail)) &&
      password.length
    ) {
      let res: any = await verifyLogin(
        loginByEmail
          ? {
              password: password,
              email: email
            }
          : {
              phone: phoneNumber.mobileNumber,
              password: password,
              country_code: phoneNumber.countryCode
            }
      );

      setOTPVerificationFormState(prev => ({
        ...prev,
        otpMobileNumber: `${phoneNumber.mobileNumber}`,
        countryCode: `${phoneNumber.countryCode}`,
        codeAndNumber: `${phoneNumber.countryCode} ${phoneNumber.mobileNumber}`
      }));

      if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            content={res?.error?.data?.message ?? res?.error?.status}
            header="Login Failed"
            handleClick={() => setIsDialogOpen(false)}
            buttonText="Try Again"
          />
        );
      } else if (res.data.access_token) {
        setToken((prev: any) => ({
          ...prev,
          token: res.data.access_token,
          tempToken: res.data.access_token
        }));
      } else if (
        !res.data.customer.is_email_verified &&
        loginByEmail &&
        res.data.customer.email_token
      ) {
        setEmailToken(res.data.customer.email_token);
        setTempToken(res.data.customer.temp_token);
        setCurrentState('emailVerification');
      } else if (
        res.data.customer.phone_token &&
        !res.data.customer.is_phone_verified
        // !loginByEmail
      ) {
        setCurrentState('otpVerification');
        setToken((prev: any) => ({
          ...prev,
          phoneToken: res.data.customer.phone_token,
          tempToken: res.data.customer.temp_token
        }));
        if (
          loginByEmail &&
          res.data.customer.country_code &&
          res.data.customer.phone
        ) {
          setOTPVerificationFormState((prev: any) => ({
            ...prev,
            otpMobileNumber: `${res.data.customer.phone}`,
            countryCode: `${res.data.customer.country_code}`,
            codeAndNumber: `${res.data.customer.country_code} ${res.data.customer.phone}`
          }));
          setPhoneNumber((prev: any) => ({
            ...prev,
            mobileNumber: res.data.customer.phone,
            countryCode: res.data.customer.country_code
          }));
        }
      }
    } else if (
      !loginByEmail &&
      (!password.length ||
        !phoneNumber.mobileNumber.length ||
        !isPhoneNumberValid(phoneNumber.mobileNumber))
    ) {
      if (!phoneNumber.mobileNumber && !password.length) {
        setPhoneErrorText(ENTER_PHONE);
        setPasswordErrorText(ENTER_PASSWORD);
      } else if (!phoneNumber.mobileNumber) {
        setPhoneErrorText(ENTER_PHONE);
      } else if (!isPhoneNumberValid(phoneNumber.mobileNumber)) {
        setPhoneErrorText(INVALID_MOBILE);
      } else if (!password.length) {
        setPasswordErrorText(ENTER_PASSWORD);
      }
    } else if (
      loginByEmail &&
      (!email.length || !isEmailValid(email) || !password.length)
    ) {
      if ((!email || !isEmailValid(email)) && !password.length) {
        setEmailErrorText(INVALID_EMAIL_FORMAT);
        setPasswordErrorText(ENTER_PASSWORD);
      } else if (!isEmailValid(email)) {
        setEmailErrorText(INVALID_EMAIL_FORMAT);
      } else if (!password.length) {
        setPasswordErrorText(ENTER_PASSWORD);
      }
    }

    setIsLoading(false);
  };
  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Events.ENTER) {
      handleLogin();
    }
  };

  const renderContentWithEmail = () => {
    return (
      <div className="flex gap-[12px] flex-col w-full">
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={editIcon} alt="update email" />
        </div>
        <div className="flex gap-[16px] flex-col mt-[60px] align-left">
          <p className="text-headingS text-neutral900 font-medium">
            Enter new email
          </p>
        </div>
        <div className="pb-2">
          <InputField
            label={ManageLocales('app.register.email')}
            onChange={event =>
              handleLoginInputChange({
                event,
                type: 'email',
                setEmail: setTempEmail,
                setEmailErrorText: setTempEmailError,
                setPasswordErrorText,
                setPassword,
                setPhoneNumber,
                setPhoneErrorText
              })
            }
            type="email"
            name="email"
            value={tempEmail !== '' ? tempEmail : email}
            errorText={tempEmailError}
            placeholder={ManageLocales('app.register.email.placeholder')}
            styles={{ inputMain: 'h-[64px]' }}
            autoComplete="none"
          />
        </div>
        <div className="flex justify-between gap-[12px]">
          <IndividualActionButton
            onClick={() => {
              setTempEmail(email);
              // setOTPVerificationFormState(prev => ({ ...prev }));
              setOTPVerificationFormErrors(initialOTPFormState);
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[170px] h-10"
          >
            {ManageLocales('app.OTPVerification.cancel')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              isEmailValid(tempEmail)
                ? resendEmailOTP({ resend_token: tempToken, email: tempEmail })
                    .unwrap()
                    .then((res: any) => {
                      if (res) {
                        setEmail(tempEmail);
                        setResendTimer(60);
                        setIsInputDialogOpen(false);
                        setTempToken(res.customer.temp_token);
                        setEmailToken(res.customer.email_token);
                      }
                    })
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data.message}
                          handleClick={() => setIsDialogOpen(false)}
                        />
                      );
                    })
                : setTempEmailError(INVALID_EMAIL_FORMAT);
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[170px] h-10"
            type="button"
          >
            {ManageLocales('app.OTPVerification.save')}
          </IndividualActionButton>
        </div>
      </div>
    );
  };
  const renderContentWithInput = () => {
    return (
      <div className="flex gap-[12px] flex-col w-full">
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={editIcon} alt="update phone number" />
        </div>
        <div className="flex gap-[16px] flex-col mt-[60px] align-left">
          <p className="text-headingS text-neutral900 font-medium">
            Enter new mobile number
          </p>
        </div>
        <div className="pb-2">
          <MobileInput
            label={ManageLocales('app.register.mobileNumber')}
            onChange={event => {
              setOTPVerificationFormErrors(prev => ({
                ...prev,
                otpMobileNumber: ''
              }));

              handleOTPChange({ event, setOTPVerificationFormState });
            }}
            type="number"
            name="otpMobileNumber"
            errorText={otpVerificationFormErrors.otpMobileNumber}
            placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
            registerFormState={otpVerificationFormState}
            setRegisterFormState={setOTPVerificationFormState}
            value={otpVerificationFormState.otpMobileNumber}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex justify-between gap-[12px]">
          <IndividualActionButton
            onClick={() => {
              setOTPVerificationFormState(prev => ({ ...prev }));
              setOTPVerificationFormErrors(initialOTPFormState);
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[170px] h-10"
          >
            {ManageLocales('app.OTPVerification.cancel')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              handleEditMobileNumber({
                // verifyNumber,
                otpVerificationFormState,
                setOTPVerificationFormErrors,
                setOTPVerificationFormState,
                setIsInputDialogOpen,
                setIsDialogOpen,
                setDialogContent,
                sendOtp,
                setToken,
                token
              });
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[170px] h-10"
            type="button"
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
            setPhoneErrorText={setPhoneErrorText}
            setPasswordErrorText={setPasswordErrorText}
            setPassword={setPassword}
            handleKeyDown={handleKeyDown}
            phoneNumber={phoneNumber}
            phoneErrorText={phoneErrorText}
            password={password}
            passwordErrorText={passwordErrorText}
            handleLogin={handleLogin}
            currentCountryCode={currentCountryCode}
            setEmail={setEmail}
            setEmailErrorText={setEmailErrorText}
            email={email}
            emailErrorText={emailErrorText}
            loginByEmail={loginByEmail}
            setLoginByEmail={setLoginByEmail}
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
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            // setOTPVerificationFormState={setOTPVerificationFormState}
          />
        );
      case 'emailVerification':
        return (
          <EmailVerification
            email={email}
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            sendOtp={sendOtp}
            resendTimer={resendTimer}
            setCurrentState={setCurrentState}
            emailToken={emailToken}
            userLoggedIn={userLoggedIn}
            setIsInputDialogOpen={setIsInputDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            verifyOTP={verifyOTP}
            setToken={setToken}
            setResendTimer={setResendTimer}
            role={'login'}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            tempToken={tempToken}
            setTempToken={setTempToken}
            setEmailToken={setEmailToken}
          />
        );
      case 'successfullyCreated':
        return <ConfirmScreen />;
    }
  };

  // JSX rendering for the Login component
  return (
    <>
      {isLoading && <CustomKGKLoader />}

      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={
          currentState === 'emailVerification'
            ? renderContentWithEmail
            : renderContentWithInput
        }
        dialogStyle="min-h-[280px]"
      />
      <UserAuthenticationLayout
        formData={renderLoginContent()}
        screen={currentState}
      />
    </>
  );
};

export default Login;
