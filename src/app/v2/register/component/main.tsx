'use client';
import React, { useEffect, useState } from 'react';
import { ManageLocales } from '@/utils/translate';
import { useRegisterMutation } from '@/features/api/register';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import RegisterComponent from './register';
import editIcon from '@public/v2/assets/icons/modal/edit.svg';
import {
  useSendOtpMutation,
  useVerifyOTPMutation
} from '@/features/api/otp-verification';
import Image from 'next/image';

import useUser from '@/lib/use-auth';
import { useGetAuthDataQuery } from '@/features/api/login';
import { DialogComponent } from '@/components/v2/common/dialog';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import OTPVerification from '@/components/v2/common/otp-verication';

import ConfirmScreen from './confirmation-screen';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { handleEditMobileNumber } from '@/components/v2/common/otp-verication/helpers/handle-edit-mobile-number';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import { handleOTPChange } from '@/components/v2/common/otp-verication/helpers/handle-otp-change';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { useRegisterStateManagement } from '../hooks/register-state-management';
import { isSessionValid } from '@/utils/manage-session';
import { Tracking } from '@/constants/funnel-tracking';
import { useLazyRegisterFunnelQuery } from '@/features/api/funnel';
import { trackEvent } from '@/utils/ga';
import { useRouter } from 'next/navigation';

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
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;

  const [token, setToken] = useState(initialTokenState);

  const { isTokenChecked, authToken, userLoggedIn } = useUser();

  useEffect(() => {
    if (isTokenChecked) {
      authToken && router && router.push('/v2/');
    }
  }, [isTokenChecked]);

  const { data: userData } = useGetAuthDataQuery(token.token, {
    skip: !token.token
  });

  //APi CAlls
  const { data, error } = useGetCountryCodeQuery({});
  const [register] = useRegisterMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [sendOtp] = useSendOtpMutation();
  let [funnelTrack] = useLazyRegisterFunnelQuery();

  const router = useRouter();
  useEffect(() => {
    const userIp = JSON.parse(localStorage.getItem('userIp')!);

    if (userIp) {
      setRegisterFormState({
        ...registerFormState,
        countryCode: userIp.countryCode,
        iso: userIp?.iso
      });
      setOTPVerificationFormState({
        ...otpVerificationFormState,
        countryCode: userIp.countryCode,
        iso: userIp?.iso
      });
    } else if (data) {
      setRegisterFormState({
        ...registerFormState,
        countryCode: data.country_calling_code.replace('+', ''),
        iso: data?.country
      });
      setOTPVerificationFormState({
        ...otpVerificationFormState,
        countryCode: data.country_calling_code.replace('+', ''),
        iso: data?.country
      });
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [data, error]);

  // useEffect(() => {
  //   // Check if browser history and pushState are available
  //   if (window.history && window.history.replaceState) {
  //     // Simulate a state push to add an entry to the history
  //     window.history.replaceState({ forward: true }, '', '');

  //     // Function to handle popstate events
  //     const handlePopState = () => {
  //       alert('Back button was pressed.');
  //     };

  //     // Add the event listener for popstate
  //     window.addEventListener('popstate', handlePopState);

  //     // Cleanup the event listener when the component unmounts
  //     return () => {
  //       window.removeEventListener('popstate', handlePopState);
  //     };
  //   }
  // }, []);

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
            placeholder={'Enter mobile number'}
            registerFormState={otpVerificationFormState}
            setRegisterFormState={setOTPVerificationFormState}
            value={otpVerificationFormState.otpMobileNumber}
          />
        </div>
        <div className="flex justify-between gap-[12px]">
          <IndividualActionButton
            onClick={() => {
              setOTPVerificationFormState(prev => ({ ...prev }));
              setOTPVerificationFormErrors(initialOTPFormState);
              setIsInputDialogOpen(false);
              funnelTrack({
                step: Tracking.Click_Mobile_Edit_Cancel,
                sessionId: isSessionValid(),
                entryPoint: localStorage.getItem('entryPoint') || ''
              });
              trackEvent({
                action: Tracking.Click_Mobile_Edit_Cancel,
                entry_point: localStorage.getItem('entryPoint') || '',
                category: 'Registration'
              });
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
                token,
                funnelTrack
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
            setIsLoading={setIsLoading}
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
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        );

      case 'successfullyCreated':
        return <ConfirmScreen />;
    }
  };

  return (
    <>
      {isLoading && <CustomKGKLoader />}

      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
        dialogStyle="min-h-[280px]"
      />
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      <UserAuthenticationLayout
        formData={renderContent()}
        screen={currentState}
      />
    </>
  );
};

export default Register;

// Define the Login component
