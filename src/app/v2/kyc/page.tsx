'use client';
import React, { useEffect, useState } from 'react';
import CountrySelection from './components/country-selection';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import SubmissionOption from './components/submission-option';
import CompanyOwnerDetail from './components/company-owner-detail';
import { useSelector } from 'react-redux';
import BankingDetails from './components/banking-details';
import PersonalDetail from './components/personal-detail';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ManageLocales } from '@/utils/v2/translate';
import OtpInput from '@/components/v2/common/otp';
import { useOtpVerificationStateManagement } from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import { handleResendOTP } from '@/components/v2/common/otp-verication/helpers/handle-resend-otp';
import {
  useSendResetOtpMutation,
  useVerifyResetOTPMutation
} from '@/features/api/otp-verification';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { handleResetOTP } from '../forgot-password/hooks/verify-reset-otp';
import arrowBackwar from '@public/v2/assets/icons/kyc/arrow-backward.svg';
import Image from 'next/image';

const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const KYC = () => {
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);
  const [currentState, setCurrentState] = useState('personal_details');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubmissionOption, setSelectedSubmissionOption] = useState('');
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;
  const { setIsInputDialogOpen, setDialogContent, setIsDialogOpen } =
    modalSetState;

  const [sendResetOtp] = useSendResetOtpMutation();
  const [verifyResetOTP] = useVerifyResetOTPMutation();

  const [phoneNumber] = useState<{
    countryCode: string;
    phoneNumber: string;
  }>({ countryCode: '', phoneNumber: '' });

  const [token, setToken] = useState(initialTokenState);
  const [errorOtp, setOtpError] = useState('');
  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { otpValues, resendTimer, otpVerificationFormState } =
    otpVericationState;
  const { setOtpValues, setResendTimer } = otpVerificationSetState;

  const dispatch = useAppDispatch();

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    setCurrentState('submission_option');
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: country
      })
    );
  };

  const handleSubmissionOptionClick = (selection: string) => {
    setSelectedSubmissionOption(selection);
    dispatch(
      updateFormState({
        name: 'formState.offline',
        value: selection !== 'online'
      })
    );
  };

  const handleBack = (currentState: string) => {
    setCurrentState(currentState);
  };

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      countdownInterval = setInterval(() => {
        setResendTimer((prevTimer: number) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendTimer]);

  function checkOTPEntry(otpEntry: string[]) {
    for (let i = 0; i < otpEntry.length; i++) {
      if (otpEntry[i] === '') {
        return false;
      }
    }
    return true;
  }

  const renderContent = () => {
    switch (currentState) {
      case 'country_selection':
        return (
          <CountrySelection
            handleCountrySelection={handleCountrySelection}
            selectedCountry={selectedCountry}
          />
        );
      case 'submission_option':
        return (
          <SubmissionOption
            handleSubmissionOptionClick={handleSubmissionOptionClick}
            selectedSubmissionOption={selectedSubmissionOption}
            handleBack={handleBack}
          />
        );

      case 'company_owner_detail':
        return (
          <CompanyOwnerDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
          />
        );
      case 'banking_details':
        return (
          <BankingDetails
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={'India'}
          />
        );
      case 'personal_details':
        return (
          <PersonalDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={'India'}
          />
        );
    }
  };

  const renderContentWithInput = () => {
    return (
      <div className="flex flex-col gap-[18px] items-center">
        <h1 className="text-headingM text-neutral900 font-medium">
          {ManageLocales('app.modal.kyc.emailVerification')}
        </h1>
        <div className="flex flex-col text-mRegular text-neutral900 font-regular text-center gap-[8px]">
          <p>
            Please check your inbox for an email with the subject line
            &quot;Email Verification&quot;.{' '}
          </p>
          <p>
            Enter the code provided in the email to confirm and validate your
            email address.{' '}
          </p>
        </div>
        <div className="w-[100%] mt-[10px]">
          <OtpInput
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            error={errorOtp}
          />
        </div>

        <div className="flex justify-center py-[10px]">
          <p className="text-neutral-900 pr-10">Didn’t receive the email?</p>
          <p
            className={`${
              resendTimer > 0 ? 'text-neutral-200' : 'text-infoMain'
            } cursor-pointer`}
            onClick={() =>
              resendTimer > 0
                ? {}
                : handleResendOTP({
                    otpVerificationFormState,
                    setResendTimer,
                    sendOtp: sendResetOtp,
                    setIsDialogOpen,
                    setDialogContent,
                    setToken
                  })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>
        <div className="w-[100%]">
          {' '}
          <IndividualActionButton
            onClick={() =>
              checkOTPEntry(otpValues)
                ? (handleResetOTP({
                    otpValues,
                    setCurrentState,
                    token,
                    setIsDialogOpen,
                    setDialogContent,
                    verifyResetOTP,
                    phoneNumber,
                    setToken
                  }),
                  setOtpError(''))
                : setOtpError(
                    `We're sorry, but the OTP you entered is incorrect or has expired`
                  )
            }
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] "
          >
            {ManageLocales('app.verifyOTP')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] !border-none"
          >
            <Image src={arrowBackwar} alt="arrowBackwar" />
            <span className="ml-[4px]">
              {' '}
              {ManageLocales('app.verifyOtp.goBack')}
            </span>
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  return (
    <div>
      {' '}
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
        dialogStyle={'max-w-[450px] min-h-[460px]'}
      />
      {renderContent()}
    </div>
  );
};

export default KYC;
