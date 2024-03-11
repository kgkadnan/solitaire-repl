import { IOtp } from '.';

export interface IOtpVerificationSetState {
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setOTPVerificationFormErrors: React.Dispatch<React.SetStateAction<IOtp>>;
}
export interface IOtpVerificationState {
  otpValues: string[];
  resendTimer: number;
  otpVerificationFormState: IOtp;
  otpVerificationFormErrors: IOtp;
}
