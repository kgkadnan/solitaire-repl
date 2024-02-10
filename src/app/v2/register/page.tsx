'use client';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import React, { useEffect, useState } from 'react';
import { ManageLocales } from '@/utils/translate';
import { useRegisterMutation } from '@/features/api/register';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import RegisterComponent from './component/register';
import { FloatingLabelInput } from '@/components/common/floating-input';
import {
  useSendOtpMutation,
  useVerifyOTPMutation,
  useVerifyPhoneQuery
} from '@/features/api/otp-verification';
import Select from 'react-select';
import { CustomInputDialog } from '@/components/common/input-dialog';

import Link from 'next/link';
import useUser from '@/lib/use-auth';
import { handleOTPChange } from '@/components/otp-verication/helpers/handle-otp-change';
import { handleOTPSelectChange } from '@/components/otp-verication/helpers/handle-otp-select-change';
import { handleEditMobileNumber } from '@/components/otp-verication/helpers/handle-edit-mobile-number';
import { useRegisterStateManagement } from './hooks/register-state-management';
import ConfirmScreen from '@/components/common/confirmation-screen';
import { useGetAuthDataQuery } from '@/features/api/login';
import { countryCodeSelectStyle } from '@/app/my-account/kyc/styles/country-code-select-style';
import { computeCountryDropdownField } from '@/app/my-account/kyc/helper/compute-country-dropdown';
import countryCode from '../../../constants/country-code.json';
import { DialogComponent } from '@/components/v2/common/dialog';
import UserAuthenticationLayout from '@/components/v2/common/user-authentication-layout';
import OTPVerification from '@/components/v2/common/otp-verication';
import {
  initialOTPFormState,
  useOtpVerificationStateManagement
} from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';

export interface IOtp {
  otpMobileNumber: string;
  otpCountryCode: string;
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
  const [currentState, setCurrentState] = useState('OTPVerification');
  const [role, setRole] = useState('');

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;

  const { data: verifyNumber } = useVerifyPhoneQuery({
    country_code: otpVerificationFormState.otpCountryCode,
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
        countryCode: data.country_calling_code
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
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p> Change Mobile Number</p>
        </div>
        <div className="flex text-center justify-between  w-[350px]">
          <div className="w-[25%]">
            <Select
              name="otpCountryCode"
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
              name="otpMobileNumber"
              value={otpVerificationFormState.otpMobileNumber}
              errorText={otpVerificationFormErrors.otpMobileNumber}
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
