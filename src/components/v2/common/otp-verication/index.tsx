'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Edit from '@public/v2/assets/icons/edit-number.svg?url';
import { ManageLocales } from '@/utils/translate';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { handleVerifyOtp } from './helpers/handle-verify-otp';
import { handleResendOTP } from './helpers/handle-resend-otp';
import { IToken } from '@/app/register/page';
import { IndividualActionButton } from '../action-button/individual-button';
import OtpInput from '../otp';

export interface IOtp {
  otpMobileNumber: string;
  otpCountryCode: string;
  codeAndNumber: string;
}

interface IOTPVerification {
  otpVerificationFormState: IOtp;
  setIsInputDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  otpValues: string[];
  resendTimer: number;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  token: IToken;
  userLoggedIn: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyOTP: any;
  role?: string;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  sendOtp: any;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
}

const OTPVerification = ({
  otpVerificationFormState,
  setIsInputDialogOpen,
  setOtpValues,
  otpValues,
  resendTimer,
  setCurrentState,
  token,
  userLoggedIn,
  setIsDialogOpen,
  setDialogContent,
  verifyOTP,
  setResendTimer,
  sendOtp,
  role = '',
  setToken
}: IOTPVerification) => {
  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  const [error, setError] = useState('');
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      countdownInterval = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
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

  return (
    <div className="flex  items-center">
      <div className="flex flex-col w-[450px] p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral-200">
        <div className="flex flex-col items-center">
          <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />
        </div>

        <div className="parent relative">
          <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
        </div>
        <div className="text-headingM text-neutral-900 font-medium text-left">
          {ManageLocales('app.OTPVerification')}
        </div>

        {setIsInputDialogOpen && (
          <div className="flex cursor-pointer">
            <p className="text-neutral-900">
              OTP has been sent to{' '}
              {`+${otpVerificationFormState.codeAndNumber}`}
            </p>
            <div
              onClick={() => setIsInputDialogOpen(true)}
              className="font-bold pl-1"
            >
              <Edit />
            </div>
          </div>
        )}
        <OtpInput
          setOtpValues={setOtpValues}
          otpValues={otpValues}
          error={error}
        />

        <div className="flex ">
          <p className="text-neutral-900 pr-10">Haven’t received any OTP ?</p>
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
                    sendOtp,
                    setIsDialogOpen,
                    setDialogContent,
                    setToken
                  })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>

        <IndividualActionButton
          variant={'primary'}
          size={'custom'}
          className="rounded-[4px]"
          onClick={() =>
            checkOTPEntry(otpValues)
              ? (handleVerifyOtp({
                  otpValues,
                  setCurrentState,
                  token,
                  userLoggedIn,
                  setIsDialogOpen,
                  setDialogContent,
                  verifyOTP,
                  role,
                  setToken
                }),
                setError(''))
              : setError(
                  `We're sorry, but the OTP you entered is incorrect or has expired`
                )
          }
        >
          {' '}
          {ManageLocales('app.OTPVerification.verify')}
        </IndividualActionButton>
      </div>
    </div>
  );
};

export default OTPVerification;
