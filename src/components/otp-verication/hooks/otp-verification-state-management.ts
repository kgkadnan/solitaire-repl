import { useState } from 'react';
import { IOtp } from '..';

export const initialOTPFormState: IOtp = {
  otpMobileNumber: '',
  otpCountryCode: '',
  codeAndNumber: ''
};

export const useOtpVerificationStateManagement = () => {
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
    useState<IOtp>(initialOTPFormState);
  const [otpVerificationFormErrors, setOTPVerificationFormErrors] =
    useState<IOtp>(initialOTPFormState);

  return {
    otpVericationState: {
      otpValues,
      resendTimer,
      otpVerificationFormState,
      otpVerificationFormErrors
    },

    otpVerificationSetState: {
      setOtpValues,
      setResendTimer,
      setOTPVerificationFormState,
      setOTPVerificationFormErrors
    }
  };
};
