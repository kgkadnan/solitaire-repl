'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import OtpInput from '@/components/common/otp-verification';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import KGKlogo from '@public/assets/icons/vector.svg';
import { handleGoBack } from './helpers/handle-go-back';
import { handleVerifyOtp } from './helpers/handle-verify-otp';
import { handleResendOTP } from './helpers/handle-resend-otp';

export interface IOtp {
  mobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
}

interface IOTPVerification {
  otpVerificationFormState: IOtp;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  otpValues: string[];
  resendTimer: number;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  router: any;
  phoneToken: string;
  userLoggedIn: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyOTP: any;
  role?: string;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  sendOtp: any;
}

const OTPVerification = ({
  otpVerificationFormState,
  setIsInputDialogOpen,
  setOtpValues,
  otpValues,
  resendTimer,
  setCurrentState,
  state,
  router,
  phoneToken,
  userLoggedIn,
  setIsDialogOpen,
  setDialogContent,
  verifyOTP,
  setResendTimer,
  sendOtp,
  role = ''
}: IOTPVerification) => {
  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      countdownInterval = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendTimer]);
  return (
    <div className="flex justify-center gap-5 flex-col w-[500px]">
      <div className="flex flex-col gap-[5px] mb-[20px] items-center">
        <Image src={KGKlogo} alt="KGKlogo" width={60} height={60} />
        <CustomInputlabel
          htmlfor={''}
          label={ManageLocales('app.OTPVerification')}
          overriddenStyles={{
            label: 'text-solitaireQuaternary text-[40px] font-semibold'
          }}
        />
      </div>
      <div className="flex flex-col justify-between gap-5">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-solitaireTertiary">
            OTP has been sent to {otpVerificationFormState.codeAndNumber}
          </p>
          <button
            onClick={() => setIsInputDialogOpen(true)}
            className="font-bold"
          >
            (Edit)
          </button>
        </div>

        <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />

        <div className="flex justify-center gap-3 items-center">
          <p className="text-solitaireTertiary">Haven’t received any OTP ?</p>

          <CustomDisplayButton
            displayButtonLabel={`${ManageLocales(
              'app.OTPVerification.resend'
            )} ${resendLabel}`}
            displayButtonAllStyle={{
              displayLabelStyle: 'text-[14px] font-medium'
            }}
            isDisable={resendTimer > 0}
            handleClick={() => {
              handleResendOTP({
                otpVerificationFormState,
                setResendTimer,
                sendOtp,
                setIsDialogOpen,
                setDialogContent
              });
            }}
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col gap-3">
          {/* Button to trigger the register action */}

          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.goBack')}
            displayButtonAllStyle={{
              displayButtonStyle:
                'bg-transparent  border-[1px] border-solitaireQuaternary w-[500px] h-[54px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => handleGoBack({ setCurrentState, state })}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.verify')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[500px] h-[54px]',
              displayLabelStyle:
                'text-solitaireTertiary !text-[16px] font-medium'
            }}
            handleClick={() =>
              handleVerifyOtp({
                otpValues,
                setCurrentState,
                router,
                phoneToken,
                userLoggedIn,
                setIsDialogOpen,
                setDialogContent,
                verifyOTP,
                role
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

// Define the Login component
