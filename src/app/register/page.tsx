'use client';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import React, { useEffect, useState } from 'react';
import { ManageLocales } from '@/utils/translate';
import { useRegisterMutation } from '@/features/api/register';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import OTPVerification from '@/components/otp-verication';
import RegisterComponent from './component/register';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { computeCountryDropdownField } from '../my-account/kyc/helper/compute-country-dropdown';
import { countryCodeSelectStyle } from '../my-account/kyc/styles/country-code-select-style';
import { useRouter } from 'next/navigation';
import { useVerifyOTPMutation } from '@/features/api/otp-verification';
import Select from 'react-select';
import { CustomInputDialog } from '@/components/common/input-dialog';
import countryCode from '../../constants/country-code.json';
import ConfirmScreen from './component/confirmScreen';
import Link from 'next/link';
import useUser from '@/lib/use-auth';
import { handleOTPChange } from '@/components/otp-verication/helpers/handle-otp-change';
import { handleOTPSelectChange } from '@/components/otp-verication/helpers/handle-otp-select-change';
import { handleEditMobileNumber } from '@/components/otp-verication/helpers/handle-edit-mobile-number';
import { useRegisterStateManagement } from './hooks/register-state-management';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/otp-verication/hooks/otp-verification-state-management';
export interface IOtp {
  mobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
}
const Register = () => {
  const router = useRouter();
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
  const [phoneToken, setPhoneToken] = useState('');
  const [role, setRole] = useState('');

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;

  const { userLoggedIn } = useUser();

  //APi CAlls
  const { data, error } = useGetCountryCodeQuery({});
  const [register] = useRegisterMutation();
  const [verifyOTP] = useVerifyOTPMutation();

  useEffect(() => {
    if (data) {
      setRegisterFormState({
        ...registerFormState,
        countryCode: data.country_calling_code
      });
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [data, error]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      countdownInterval = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendTimer]);

  const handleResendClick = () => {
    // Add logic to resend the OTP, e.g., API call
    // Reset the timer to 60 seconds
    setResendTimer(60);
  };

  useEffect(() => {
    setOTPVerificationFormState(prev => ({
      ...prev,
      mobileNumber: `${registerFormState.mobileNumber}`,
      countryCode: `${registerFormState.countryCode}`,
      codeAndNumber: `${registerFormState.countryCode} ${registerFormState.mobileNumber}`
    }));
  }, [registerFormState.countryCode, registerFormState.mobileNumber]);

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
                setIsDialogOpen
              });
            }}
          />
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
            setRole={setRole}
            setCurrentState={setCurrentState}
            setPhoneToken={setPhoneToken}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
          />
        );
      case 'OTPVerification':
        return (
          <OTPVerification
            otpVerificationFormState={otpVerificationFormState}
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            handleResendClick={handleResendClick}
            resendTimer={resendTimer}
            setCurrentState={setCurrentState}
            state={'register'}
            router={router}
            phoneToken={phoneToken}
            userLoggedIn={userLoggedIn}
            setIsInputDialogOpen={setIsInputDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
            verifyOTP={verifyOTP}
            role={role}
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

  return (
    <>
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <UserAuthenticationLayout formData={renderContent()} />
    </>
  );
};

export default Register;

// Define the Login component
