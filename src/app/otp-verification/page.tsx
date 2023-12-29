'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
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

export interface FormState {
  mobileNumber: string;
  countryCode: string;
  codeAndNumber: string;
}

const initialFormState: FormState = {
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

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormState>(initialFormState);

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
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleEditMobileNumber = () => {
    if (!formState.countryCode || !formState.mobileNumber) {
      setFormErrors(prev => ({
        ...prev,
        mobileNumber: 'Please enter Mobile Number to Save'
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        codeAndNumber: `${formState.countryCode} ${formState.mobileNumber}`
      }));
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    setFormState(prev => ({ ...prev, countryCode: `+${country_code}` }));
    setFormState(prev => ({ ...prev, mobileNumber: `${phone_number}` }));
  }, [country_code, phone_number]);

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p> Change Mobile Number</p>
        </div>
        <div className="flex text-center gap-5 w-[350px]">
          <select
            name="countryCode"
            value={formState.countryCode}
            onChange={handleChange}
            defaultValue={`+${country_code}`!}
            className={`bg-transparent w-[30%]  ${
              !formErrors.mobileNumber.length
                ? 'border-solitaireQuaternary text-solitaireTertiary'
                : 'border-[#983131] text-[#983131]'
            } border-b min-h-[43px] h-[43px] text-[14px] focus:outline-none`}
          >
            {countryCode.countries.map(country => (
              <option
                key={country.iso_codes}
                value={`+${country.code}`}
                defaultValue={`+${country_code}`!}
                className="bg-solitaireDenary round-0 border-none"
              >
                +{country.code}
              </option>
            ))}
          </select>

          <FloatingLabelInput
            label={ManageLocales('app.register.mobileNumber')}
            onChange={handleChange}
            type="number"
            name="mobileNumber"
            value={formState.mobileNumber}
            errorText={formErrors.mobileNumber}
          />
        </div>
        <div className="flex  gap-2">
          {/* Button to trigger the register action */}

          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.cancel')}
            displayButtonAllStyle={{
              displayButtonStyle:
                ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[80%] h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              setFormState(initialFormState);
              setFormErrors(initialFormState);
              setIsDialogOpen(false);
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.OTPVerification.save')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[80%] h-[40px]',
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
                  {!formState?.codeAndNumber.length
                    ? mobileNumber
                    : formState.codeAndNumber}
                </p>
                <button
                  onClick={() => setIsInputDialogOpen(true)}
                  className="font-bold"
                >
                  (Edit)
                </button>
              </div>

              <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />

              <div className="flex justify-between items-center">
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
                      'bg-transparent  border-[1px] border-solitaireQuaternary w-[500px] h-[64px]',
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
