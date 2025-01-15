'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Edit from '@public/v2/assets/icons/edit-number.svg?url';
import { ManageLocales } from '@/utils/translate';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/hover-kgk-icon.svg?url';
import { IndividualActionButton } from '../action-button/individual-button';
import OtpInput from '../otp';
import { IToken } from '@/app/v2/register/interface';
import { useVerifyEmailOTPMutation } from '@/features/api/kyc';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { useRouter } from 'next/navigation';
import { useSendEmailResetOtpMutation } from '@/features/api/otp-verification';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';

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
  tempToken: string;
  setTempToken: any;
  setEmailToken: any;
}

const EmailVerification = ({
  email,
  setIsInputDialogOpen,
  setOtpValues,
  otpValues,
  resendTimer,
  setCurrentState,
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
  isLoading,
  tempToken,
  setTempToken,
  setEmailToken
}: IEmailVerification) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  const [error, setError] = useState('');
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [resendEmailOTP] = useSendEmailResetOtpMutation();
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
        <div
          className="flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => router.push('/v2')}
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
          Email {ManageLocales('app.OTPVerification')}
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
                : resendEmailOTP({ resend_token: tempToken })
                    .unwrap()
                    .then((res: any) => {
                      if (res) {
                        setTempToken(res.data.customer.temp_token);
                        setEmailToken(res.data.customer.email_token);
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
        <div className="flex flex-col gap-1">
          <IndividualActionButton
            variant={'primary'}
            size={'custom'}
            disabled={isLoading}
            className="rounded-[4px]"
            onClick={() =>
              checkOTPEntry(otpValues)
                ? (verifyEmailOTP({
                    token: emailToken,
                    otp: otpValues.join(''),
                    resend_token: tempToken
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
                                  setCurrentState('login');
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
          <IndividualActionButton
            variant={'secondary'}
            size={'custom'}
            disabled={isLoading}
            className=" border-none w-[100%]"
            onClick={() => setCurrentState('login')}
          >
            <div className="text-mMedium font-medium flex items-center gap-2">
              <Image src={backArrow} alt="backArrow" />
              <p className="text-neutral900"> Go back To Login</p>
            </div>{' '}
          </IndividualActionButton>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
