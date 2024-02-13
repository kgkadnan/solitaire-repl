import Image from 'next/image';
import React, { useEffect } from 'react';
import keyIcon from '@public/v2/assets/icons/modal/key.svg';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';

import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter } from 'next/navigation';
import OtpInput from '@/components/v2/common/otp';
import { handleResendOTP } from '@/components/v2/common/otp-verication/helpers/handle-resend-otp';
import { handleResetOTP } from '../hooks/verify-reset-otp';

const OTPComponent = ({
  setOtpValues,
  otpValues,
  verifyResetOTP,
  phoneNumber,
  resendTimer,
  setResendTimer,
  otpVerificationFormState,
  sendOtp,
  setIsDialogOpen,
  setDialogContent,
  setToken,
  setCurrentState,
  token,
  userLoggedIn
}: any) => {
  const router = useRouter();
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
  return (
    <div className="flex items-center text-center">
      <div className="flex flex-col w-[450px]  p-8 gap-[24px] mt-[-60px]">
        <div className="flex flex-col items-center">
          <Image src={keyIcon} alt="keyIcon" />
        </div>

        <div className="text-headingM text-neutral-900 font-medium mt-[-170px]">
          {ManageLocales('app.forgotPassword')}
        </div>

        <div className="text-mRegular text-neutral-900">
          OTP has been sent to {phoneNumber.phoneNumber}
          <div
            className="cursor-pointer"
            onClick={() => router.push('/v2/forgot-password')}
          >
            Not My Number
          </div>
        </div>

        <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />

        <div className="flex justify-center">
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
          onClick={() =>
            handleResetOTP({
              otpValues,
              setCurrentState,
              token,
              userLoggedIn,
              setIsDialogOpen,
              setDialogContent,
              verifyResetOTP,
              phoneNumber
            })
          }
          variant={'primary'}
          size={'custom'}
          className="rounded-[4px] w-[100%]"
        >
          {ManageLocales('app.verifyOTP')}
        </IndividualActionButton>

        <IndividualActionButton
          onClick={() => router.push('/v2/login')}
          variant={'secondary'}
          size={'custom'}
          className="border-none w-[100%]"
        >
          <div className="text-mMedium font-medium flex items-center">
            <Image src={backArrow} alt="backArrow" />
            <p className="text-neutral-900">
              {ManageLocales('app.goBackToLogin')}
            </p>
          </div>
        </IndividualActionButton>
      </div>
    </div>
    // </div>
  );
};

export default OTPComponent;
