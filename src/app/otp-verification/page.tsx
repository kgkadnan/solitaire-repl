'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import OtpInput from '@/components/common/otp-verification';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import errorImage from '@public/assets/icons/error.svg';
import countryCode from '../../constants/country-code.json';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomInputDialog } from '@/components/common/input-dialog';
import { CustomDialog } from '@/components/common/dialog';
import KGKlogo from '@public/assets/icons/vector.svg';
import Select from 'react-select';
import { computeCountryDropdownField } from '../my-account/kyc/helper/compute-country-dropdown';
import { countryCodeSelectStyle } from '../my-account/kyc/styles/country-code-select-style';
export interface IOtp {
  mobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
}

const initialFormState: IOtp = {
  mobileNumber: '',
  countryCode: '',
  codeAndNumber: ''
};
const OTPVerification = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const country_code = searchParams.get('country_code');
  const phone_number = searchParams.get('phone');

  const { modalState, modalSetState } = useModalStateManagement();

  const { dialogContent, isDialogOpen, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setIsInputDialogOpen, setDialogContent } =
    modalSetState;

  const [otpValues, setOtpValues] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    ''
  ]);
  const [resendTimer, setResendTimer] = useState<number>(60);

  const [otpVerificationFormState, setOTPVerificationFormState] =
    useState<IOtp>(initialFormState);
  const [otpVerificationFormErrors, setOTPVerificationFormErrors] =
    useState<IOtp>(initialFormState);

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
        <div className="w-full flex flex-col gap-4 items-center">
          <div className=" flex justify-center align-middle items-center">
            <Image src={errorImage} alt="errorImage" />
            <p>Error!</p>
          </div>
          <div className="text-center text-solitaireTertiary">{'error'}</div>
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.register.okay')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[36px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => setIsDialogOpen(false)}
          />
        </div>
      );
      // Additional logic for failed verification
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setOTPVerificationFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectValue: any) => {
    setOTPVerificationFormState((prev: any) => ({
      ...prev,
      countryCode: selectValue.value
    }));
  };

  const handleEditMobileNumber = () => {
    if (
      !otpVerificationFormState.countryCode ||
      !otpVerificationFormState.mobileNumber
    ) {
      setOTPVerificationFormErrors(prev => ({
        ...prev,
        mobileNumber: 'Please enter Mobile Number to Save'
      }));
    } else {
      setOTPVerificationFormState(prev => ({
        ...prev,
        codeAndNumber: `${otpVerificationFormState.countryCode} ${otpVerificationFormState.mobileNumber}`
      }));
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    setOTPVerificationFormState(prev => ({
      ...prev,
      countryCode: `+${country_code}`
    }));
    setOTPVerificationFormState(prev => ({
      ...prev,
      mobileNumber: `${phone_number}`
    }));
  }, [country_code, phone_number]);

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p> Change Mobile Number</p>
        </div>
        <div className="flex text-center justify-between  w-[350px]">
          <div className="w-[25%]">
            <Select
              name="countryCode"
              options={computeCountryDropdownField(countryCode)}
              onChange={handleSelectChange}
              styles={countryCodeSelectStyle(
                otpVerificationFormErrors.countryCode
              )}
              value={{
                label: otpVerificationFormState.countryCode,
                value: otpVerificationFormState.countryCode
              }}
            />
          </div>

          <div className="w-[70%]">
            <FloatingLabelInput
              label={ManageLocales('app.register.mobileNumber')}
              onChange={handleChange}
              type="number"
              name="mobileNumber"
              value={otpVerificationFormState.mobileNumber}
              errorText={otpVerificationFormErrors.mobileNumber}
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
              setOTPVerificationFormState(initialFormState);
              setOTPVerificationFormErrors(initialFormState);
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
            handleClick={handleEditMobileNumber}
          />
        </div>
      </div>
    );
  };

  const mobileNumber = `+${country_code} ${phone_number}`;

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  return (
    <>
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <CustomDialog
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogContent={dialogContent}
      />

      <UserAuthenticationLayout
        formData={
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
                  OTP has been sent to{' '}
                  {!otpVerificationFormState?.codeAndNumber.length
                    ? mobileNumber
                    : otpVerificationFormState.codeAndNumber}
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
                <p className="text-solitaireTertiary">
                  Haven’t received any OTP ?
                </p>

                <CustomDisplayButton
                  displayButtonLabel={`${ManageLocales(
                    'app.OTPVerification.resend'
                  )} ${resendLabel}`}
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
                      'bg-transparent  border-[1px] border-solitaireQuaternary w-[500px] h-[54px]',
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
                      'bg-solitaireQuaternary w-[500px] h-[54px]',
                    displayLabelStyle:
                      'text-solitaireTertiary !text-[16px] font-medium'
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
