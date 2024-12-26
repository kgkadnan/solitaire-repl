import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import keyIcon from '@public/v2/assets/icons/modal/key.svg';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';
import editNumber from '@public/v2/assets/icons/edit-number.svg';
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
  setIsLoading,
  isLoading,
  forgotByEmail,
  email
}: any) => {
  const router = useRouter();
  const [error, setError] = useState('');
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
  return (
    <div className="flex items-center text-center">
      <div className="flex flex-col w-[450px]  p-8 gap-[24px] mt-[-60px]">
        <div className="flex flex-col items-center">
          <Image src={keyIcon} alt="keyIcon" />
        </div>

        <div className="text-headingM text-neutral900 font-medium mt-[-170px]">
          {ManageLocales('app.forgotPassword')}
        </div>

        <div className="text-mRegular text-neutral900 flex items-center justify-center gap-[3px]">
          OTP has been sent to{' '}
          {`${
            forgotByEmail
              ? email
              : `+${phoneNumber.countryCode}${phoneNumber.phoneNumber}`
          }`}
          <div
            className="cursor-pointer"
            onClick={() => {
              setResendTimer(60);
              setOtpValues(['', '', '', '', '', '']);
              setCurrentState('forgotPassword');
            }}
          >
            <Image src={editNumber} alt="editNumber" width={16} height={16} />
          </div>
        </div>

        <OtpInput
          setOtpValues={setOtpValues}
          otpValues={otpValues}
          error={error}
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
                : handleResendOTP({
                    otpVerificationFormState,
                    setResendTimer,
                    sendOtp,
                    setIsDialogOpen,
                    setDialogContent,
                    setToken,
                    setOtpValues,
                    setIsLoading,
                    forgotByEmail
                  })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>
        <div className="flex flex-col gap-1">
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
                    setToken,
                    setIsLoading,
                    forgotByEmail,
                    email
                  }),
                  setError(''))
                : setError(
                    `We're sorry, but the OTP you entered is incorrect or has expired`
                  )
            }
            disabled={!checkOTPEntry(otpValues) || isLoading}
            variant={
              !checkOTPEntry(otpValues) || isLoading ? 'disable' : 'primary'
            }
            size={'custom'}
            className="rounded-[4px] w-[100%]"
          >
            {ManageLocales('app.verifyOTP')}
          </IndividualActionButton>

          <IndividualActionButton
            onClick={() => {
              setResendTimer(60);
              router.push('/v2/login');
            }}
            variant={'secondary'}
            size={'custom'}
            className="border-none w-[100%]"
          >
            <div className="text-mMedium font-medium flex items-center">
              <Image src={backArrow} alt="backArrow" />
              <p className="text-neutral900">
                {ManageLocales('app.goBackToLogin')}
              </p>
            </div>
          </IndividualActionButton>
        </div>
      </div>
    </div>
  );
};

export default OTPComponent;
