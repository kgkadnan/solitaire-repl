import { IOtp } from '..';

interface IHandleEditMobileNumber {
  otpVerificationFormState: IOtp;
  setOTPVerificationFormErrors: React.Dispatch<React.SetStateAction<IOtp>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const handleEditMobileNumber = ({
  otpVerificationFormState,
  setOTPVerificationFormErrors,
  setOTPVerificationFormState,
  setIsDialogOpen
}: IHandleEditMobileNumber) => {
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
