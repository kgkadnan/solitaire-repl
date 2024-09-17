'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Edit from '@public/v2/assets/icons/edit-number.svg?url';
import { ManageLocales } from '@/utils/translate';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/hover-kgk-icon.svg?url';
import { handleVerifyOtp } from './helpers/handle-verify-otp';
import { IndividualActionButton } from '../action-button/individual-button';
import OtpInput from '../otp';
import { handleRegisterResendOTP } from './helpers/handle-register-resent';
import { IToken } from '@/app/v2/register/interface';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';
import { useRouter } from 'next/navigation';
import { Tracking } from '@/constants/funnel-tracking';
import { isSessionValid } from '@/utils/manage-session';
import { useLazyRegisterFunnelQuery } from '@/features/api/funnel';

export interface IOtp {
  otpMobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
  iso?: string;
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
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
  setToken,
  setIsLoading,
  isLoading
}: IOTPVerification) => {
  const router = useRouter();
  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  let [funnelTrack] = useLazyRegisterFunnelQuery();

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

  useEffect(() => {
    funnelTrack({
      step: Tracking.Mobile_Verification_PageView,

      sessionId: isSessionValid()
    });
  }, []);
  return (
    <div className="flex  items-center">
      <div className="flex flex-col w-[450px] p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral200">
        <div
          className="flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            funnelTrack({
              step: Tracking.Click_KGK_Logo,
              sessionId: isSessionValid()
            }),
              router.push('/v3');
          }}
        >
          <KgkIcon
            fill={isHovered ? '#5D6969' : '#23302C'}
            alt="KGKlogo"
            // width={60}
            // height={84}
          />
        </div>

        <div className="parent relative">
          <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
        </div>
        <div className="text-headingM text-neutral900 font-medium text-left">
          Mobile {ManageLocales('app.OTPVerification')}
        </div>

        {setIsInputDialogOpen && (
          <div className="flex cursor-pointer">
            <p className="text-neutral900">
              OTP has been sent to{' '}
              {otpVerificationFormState.codeAndNumber &&
                `+${otpVerificationFormState.codeAndNumber}`}
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
          setError={setError}
        />

        <div className="flex justify-center">
          <p className="text-neutral900 pr-10">Haven’t received any OTP ?</p>
          <p
            className={`${
              resendTimer > 0 ? 'text-neutral500' : 'text-infoMain'
            } cursor-pointer`}
            onClick={() =>
              resendTimer > 0
                ? {}
                : handleRegisterResendOTP({
                    otpVerificationFormState,
                    setResendTimer,
                    sendOtp,
                    setIsDialogOpen,
                    setDialogContent,
                    setToken,
                    token
                  })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>
        <div className="flex flex-col   gap-1">
          <IndividualActionButton
            disabled={!checkOTPEntry(otpValues) || isLoading}
            variant={
              !checkOTPEntry(otpValues) || isLoading ? 'disable' : 'primary'
            }
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
                    setToken,
                    setError,
                    setIsLoading,
                    funnelTrack,
                    phone: `+${otpVerificationFormState.codeAndNumber}`
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
          <IndividualActionButton
            variant={'secondary'}
            size={'custom'}
            disabled={isLoading}
            className=" border-none w-[100%]"
            onClick={() =>
              role === 'login'
                ? setCurrentState('login')
                : router.push('/v2/login')
            }
          >
            <div className="text-mMedium font-medium flex items-center gap-2">
              <Image src={backArrow} alt="backArrow" />
              <p className="text-neutral900"> Go back to Login</p>
            </div>
          </IndividualActionButton>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
