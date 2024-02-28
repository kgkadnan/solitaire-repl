'use client';
import React, { useEffect, useState } from 'react';
import { ManageLocales } from '@/utils/translate';
import { useRegisterMutation } from '@/features/api/register';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import RegisterComponent from './component/register';
import editIcon from '@public/v2/assets/icons/modal/edit.svg';
import {
  useSendOtpMutation,
  useVerifyOTPMutation,
  useVerifyPhoneQuery
} from '@/features/api/otp-verification';
import Image from 'next/image';

import useUser from '@/lib/use-auth';
import { useRegisterStateManagement } from './hooks/register-state-management';
import { useGetAuthDataQuery } from '@/features/api/login';
import { DialogComponent } from '@/components/v2/common/dialog';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import OTPVerification from '@/components/v2/common/otp-verication';

import ConfirmScreen from './component/confirmation-screen';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { handleEditMobileNumber } from '@/components/v2/common/otp-verication/helpers/handle-edit-mobile-number';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import { handleOTPChange } from '@/components/v2/common/otp-verication/helpers/handle-otp-change';

export interface IOtp {
  otpMobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
}
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
const Register = () => {
  const { registerState, registerSetState } = useRegisterStateManagement();
  const { registerFormState } = registerState;
  const { setRegisterFormState } = registerSetState;

  //otp verification state
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

  //common states
  const [currentState, setCurrentState] = useState('register');
  const [role, setRole] = useState('');

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;

  const { data: verifyNumber } = useVerifyPhoneQuery({
    country_code: otpVerificationFormState.countryCode,
    phone_number: otpVerificationFormState.otpMobileNumber
  });

  const [token, setToken] = useState(initialTokenState);

  const { userLoggedIn } = useUser();
  const { data: userData } = useGetAuthDataQuery(token.token, {
    skip: !token.token
  });

  //APi CAlls
  const { data, error } = useGetCountryCodeQuery({});
  const [register] = useRegisterMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [sendOtp] = useSendOtpMutation();

  useEffect(() => {
    if (data) {
      setRegisterFormState({
        ...registerFormState,
        countryCode: data.country_calling_code.replace('+', '')
      });
      setOTPVerificationFormState({
        ...otpVerificationFormState,
        countryCode: data.country_calling_code.replace('+', '')
      });
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [data, error]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData]);

  const renderContentWithInput = () => {
    return (
      <div className="flex gap-[12px] flex-col w-full">
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={editIcon} alt="update phone number" />
        </div>
        <div className="flex gap-[12px] flex-col mt-[80px] align-left">
          <p className="text-headingS text-neutral900 font-medium">
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
            className="rounded-[4px] w-[170px] h-10"
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
                setToken,
                token
              });
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[170px] h-10"
          >
            {ManageLocales('app.OTPVerification.save')}
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentState) {
      case 'register':
        return (
          <RegisterComponent
            registerSetState={registerSetState}
            registerState={registerState}
            register={register}
            setCurrentState={setCurrentState}
            setToken={setToken}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            setOTPVerificationFormState={setOTPVerificationFormState}
            setRole={setRole}
          />
        );
      case 'OTPVerification':
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
            role={role}
            setResendTimer={setResendTimer}
            setToken={setToken}
          />
        );

      case 'successfullyCreated':
        return <ConfirmScreen />;
    }
  };

  return (
    <>
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <UserAuthenticationLayout
        formData={renderContent()}
        screen={currentState}
      />
    </>
  );
};

export default Register;

// Define the Login component
