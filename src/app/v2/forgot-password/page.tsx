'use client';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '@/features/api/forgot-password';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { INVALID_PHONE } from '@/constants/error-messages/register';
import { Events } from '@/constants/enums/event';
import { statusCode } from '@/constants/enums/status-code';
import InvalidCreds from '../login/component/invalid-creds';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import { DialogComponent } from '@/components/v2/common/dialog';
import ConfirmScreen from '../register/component/confirmation-screen';
import ForgotComponent from './component/forgot-password';
import { isPhoneNumberValid } from '@/utils/validate-phone';
import { useOtpVerificationStateManagement } from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import {
  useSendOtpMutation,
  useVerifyOTPMutation
} from '@/features/api/otp-verification';
import useUser from '@/lib/use-auth';
import OTPComponent from './component/otp';
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

  const [verifyResetOTP] = useVerifyOTPMutation();
  const [sendOtp] = useSendOtpMutation();

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

    if (isPhoneNumberValid(inputValue)) {
      setPhoneErrorText('');
    } else {
      setPhoneErrorText(INVALID_PHONE);
    }
  };

  const handleForgotPassword = async () => {
    if (phoneNumber.phoneNumber.length && !phoneErrorText) {
      let res: any = await forgotPassword({
        phone: phoneNumber.phoneNumber,
        country_code: phoneNumber.countryCode
      });

      // setIsConfirmed(true);

      if (res?.data?.statusCode === statusCode.SUCCESS) {
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
    setResendTimer
    // setOTPVerificationFormState,
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
            sendOtp={sendOtp}
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
      case 'successfullyCreated':
        return <ConfirmScreen />;
    }
  };
  return (
    <>
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
