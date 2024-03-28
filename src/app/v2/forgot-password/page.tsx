'use client';
import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '@/features/api/forgot-password';
import { INVALID_PHONE } from '@/constants/error-messages/register';
import { Events } from '@/constants/enums/event';
import { statusCode } from '@/constants/enums/status-code';
import InvalidCreds from '../login/component/invalid-creds';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import { DialogComponent } from '@/components/v2/common/dialog';
import ForgotComponent from './component/forgot-password';
import { isPhoneNumberValid } from '@/utils/validate-phone';
import { useOtpVerificationStateManagement } from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import {
  useSendResetOtpMutation,
  useVerifyResetOTPMutation
} from '@/features/api/otp-verification';
import useUser from '@/lib/use-auth';
import OTPComponent from './component/otp';
import ResetComponent from './component/reset-password';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import AppDownloadPopup from '@/components/v2/common/alert-pop-for-mobile';
const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState<{
    countryCode: string;
    phoneNumber: string;
  }>({ countryCode: '', phoneNumber: '' });
  const { modalState, modalSetState } = useModalStateManagement();
  const [currentState, setCurrentState] = useState('forgotPassword');
  const { dialogContent, isDialogOpen } = modalState;
  const [phoneErrorText, setPhoneErrorText] = useState<string>('');

  const { setIsDialogOpen, setDialogContent } = modalSetState;

  // Use the forgot password mutation hook
  const [forgotPassword] = useForgotPasswordMutation();

  const [verifyResetOTP] = useVerifyResetOTPMutation();
  const [sendResetOtp] = useSendResetOtpMutation();

  const [token, setToken] = useState(initialTokenState);
  const { userLoggedIn } = useUser();

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Events.ENTER) {
      handleForgotPassword();
    }
  };
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPhoneNumber((prev: any) => ({ ...prev, phoneNumber: inputValue }));
    setPhoneErrorText('');
  };
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

  const handleForgotPassword = async () => {
    if (
      phoneNumber.phoneNumber.length &&
      isPhoneNumberValid(phoneNumber.phoneNumber)
    ) {
      let res: any = await forgotPassword({
        phone: phoneNumber.phoneNumber,
        country_code: phoneNumber.countryCode
      });
      setOTPVerificationFormState(prev => ({
        ...prev,
        otpMobileNumber: `${phoneNumber.phoneNumber}`,
        countryCode: `${phoneNumber.countryCode}`,
        codeAndNumber: `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`
      }));
      // setIsConfirmed(true);

      if (res?.data?.statusCode === statusCode.SUCCESS) {
        setToken((prev: any) => ({
          ...prev,
          phoneToken: res?.data.data.token || '',
          tempToken: res?.data.data.token || ''
        }));

        setCurrentState('otpVerification');
      } else if (res.error) {
        setIsDialogOpen(true);
        setDialogContent(
          <InvalidCreds
            content={res?.error.data.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      }
    } else {
      setPhoneErrorText(INVALID_PHONE);
    }
  };
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
    setOTPVerificationFormState
    // setOTPVerificationFormErrors
  } = otpVerificationSetState;

  const renderForgotPasswordContent = () => {
    switch (currentState) {
      case 'forgotPassword':
        return (
          <ForgotComponent
            handlePhone={handlePhone}
            handleKeyDown={handleKeyDown}
            handleForgotPassword={handleForgotPassword}
            state={phoneNumber}
            setState={setPhoneNumber}
            value={phoneNumber.phoneNumber}
            errorText={phoneErrorText}
          />
        );

      case 'otpVerification':
        return (
          <OTPComponent
            otpVerificationFormState={otpVerificationFormState}
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            // sendOtp={sendOtp}
            sendOtp={sendResetOtp}
            resendTimer={resendTimer}
            setCurrentState={setCurrentState}
            token={token}
            userLoggedIn={userLoggedIn}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            verifyResetOTP={verifyResetOTP}
            role={'forgotPassword'}
            setResendTimer={setResendTimer}
            setToken={setToken}
            phoneNumber={phoneNumber}
          />
        );
      case 'resetPassword':
        return (
          <ResetComponent
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            token={token}
          />
        );
    }
  };
  return (
    <>
      {/* <AppDownloadPopup></AppDownloadPopup> */}
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data-testid={'success-indicator'}
      />

      <UserAuthenticationLayout
        formData={renderForgotPasswordContent()}
        screen={currentState}
      />
    </>
  );
};

export default ForgotPassword;
