'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Edit from '@public/v2/assets/icons/edit-number.svg?url';
import { ManageLocales } from '@/utils/translate';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { IndividualActionButton } from '../action-button/individual-button';
import OtpInput from '../otp';
import { IToken } from '@/app/v2/register/interface';
import {
  useResendEmailOTPMutation,
  useVerifyEmailOTPMutation
} from '@/features/api/kyc';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { useRouter } from 'next/navigation';

export interface IOtp {
  otpMobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
  iso?: string;
}

interface IEmailVerification {
  email: string;
  setIsInputDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  otpValues: string[];
  resendTimer: number;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  emailToken: string;
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

const EmailVerification = ({
  email,
  setIsInputDialogOpen,
  setOtpValues,
  otpValues,
  resendTimer,
  // setCurrentState,
  emailToken,
  // userLoggedIn,
  setIsDialogOpen,
  setDialogContent,
  // verifyOTP,
  setResendTimer,
  // sendOtp,
  // role = '',
  // setToken,
  // setIsLoading,
  isLoading
}: IEmailVerification) => {
  const router = useRouter();

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  const [error, setError] = useState('');
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [resendEmailOTP] = useResendEmailOTPMutation();
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
      <div className="flex flex-col w-[450px] p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral200">
        <div className="flex flex-col items-center">
          <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />
        </div>

        <div className="parent relative">
          <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
        </div>
        <div className="text-headingM text-neutral900 font-medium text-left">
          {ManageLocales('app.OTPVerification')}
        </div>

        {setIsInputDialogOpen && (
          <div className="flex cursor-pointer">
            <p className="text-neutral900">OTP has been sent to {email}</p>
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

        <div className="flex ">
          <p className="text-neutral900 pr-10">Haven’t received any OTP ?</p>
          <p
            className={`${
              resendTimer > 0 ? 'text-neutral200' : 'text-infoMain'
            } cursor-pointer`}
            onClick={() =>
              resendTimer > 0
                ? {}
                : resendEmailOTP({})
                    .unwrap()
                    .then((res: any) => {
                      if (res) {
                        setResendTimer(60);
                      }
                    })
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
                          handleClick={() => setIsDialogOpen(false)}
                        />
                      );
                    })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>

        <IndividualActionButton
          variant={'primary'}
          size={'custom'}
          disabled={isLoading}
          className="rounded-[4px]"
          onClick={() =>
            checkOTPEntry(otpValues)
              ? (verifyEmailOTP({
                  token: emailToken,
                  otp: otpValues.join('')
                })
                  .unwrap()
                  .then((res: any) => {
                    if (res) {
                      // setIsInputDialogOpen(false);
                      setIsDialogOpen(true);
                      setDialogContent(
                        <CommonPoppup
                          content={''}
                          status="success"
                          customPoppupBodyStyle="!mt-[65px]"
                          customPoppupStyle="h-[200px]"
                          header={'Your email has been verified successfully'}
                          actionButtonData={[
                            {
                              variant: 'primary',
                              label: 'Login',
                              handler: () => {
                                setIsDialogOpen(false);
                                router.push(`/v2/login`);
                              },
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      );
                    }
                  })
                  .catch((e: any) => {
                    setIsDialogOpen(true);
                    setDialogContent(
                      <CommonPoppup
                        content=""
                        header={e?.data?.message}
                        handleClick={() => setIsDialogOpen(false)}
                      />
                    );
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

export default EmailVerification;
