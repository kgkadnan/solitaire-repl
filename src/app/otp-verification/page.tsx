'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import OtpInput from '@/components/common/otp-verification';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import errorImage from '@public/assets/icons/error.svg';

const OTPVerification = () => {
  const router = useRouter();
  const { modalState, modalSetState } = useModalStateManagement();

  const { dialogContent, isDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;

  const [otpValues, setOtpValues] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    ''
  ]);
  const [resendTimer, setResendTimer] = useState<number>(60);

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

  const correctOtp = '123456'; // Example correct OTP. In a real application, this should be dynamically obtained.

  const verifyOtp = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp === correctOtp) {
      router.push('/successfully-created');
      // Additional logic for successful verification
    } else {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className=" flex justify-center align-middle items-center">
            <Image src={errorImage} alt="errorImage" />
            <p>Error!</p>
          </div>
          <div className="text-center text-solitaireTertiary">{''}</div>
        </>
      );
      // Additional logic for failed verification
    }
  };
  const goBack = () => {
    router.back();
  };

  const resendLabel = resendTimer > 0 ? `(${resendTimer})` : '';
  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <UserAuthenticationLayout
        formData={
          <div className="flex justify-center gap-5 flex-col w-[500px]">
            <div className="flex flex-col gap-[5px] mb-[20px] items-center">
              <Image src={handImage} alt="Banner image" />
              <CustomInputlabel
                htmlfor={''}
                label={ManageLocales('app.OTPVerification')}
                overriddenStyles={{
                  label: 'text-solitaireQuaternary text-[40px] font-semibold'
                }}
              />
            </div>
            <div className="flex flex-col justify-between h-[17vh]">
              <div className="">
                <p className="text-solitaireTertiary">
                  OTP has been sent to +91 0000 000 000 (change)
                </p>
              </div>

              <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />

              <div className="flex justify-between items-center">
                <p className="text-solitaireTertiary">
                  Haven’t received any OTP ?
                </p>

                <CustomDisplayButton
                  displayButtonLabel={`${ManageLocales(
                    'app.OTPVerification.resend'
                  )} ${resendLabel}Sec`}
                  displayButtonAllStyle={{
                    displayLabelStyle: 'text-[14px] font-medium'
                  }}
                  isDisable={resendTimer > 0}
                  handleClick={handleResendClick}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-3">
                {/* Button to trigger the register action */}

                <CustomDisplayButton
                  displayButtonLabel={ManageLocales(
                    'app.OTPVerification.goBack'
                  )}
                  displayButtonAllStyle={{
                    displayButtonStyle:
                      'bg-transparent  border-2 border-solitaireQuaternary w-[500px] h-[64px]',
                    displayLabelStyle:
                      'text-solitaireTertiary text-[16px] font-medium'
                  }}
                  handleClick={goBack}
                />
                <CustomDisplayButton
                  displayButtonLabel={ManageLocales(
                    'app.OTPVerification.verify'
                  )}
                  displayButtonAllStyle={{
                    displayButtonStyle:
                      'bg-solitaireQuaternary w-[500px] h-[64px]',
                    displayLabelStyle:
                      'text-solitaireTertiary text-[16px] font-medium'
                  }}
                  handleClick={verifyOtp}
                />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default OTPVerification;

// Define the Login component
