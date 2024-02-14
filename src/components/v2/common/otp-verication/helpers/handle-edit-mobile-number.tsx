import { IOtp } from '..';
import { IToken } from '@/app/register/page';
import logger from 'logging/log-util';
import ErrorModel from '@/components/common/error-model';
interface IHandleEditMobileNumber {
  otpVerificationFormState: IOtp;
  setOTPVerificationFormErrors: React.Dispatch<React.SetStateAction<IOtp>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyNumber: any;
  sendOtp: any;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  token?: any;
}
export const handleEditMobileNumber = ({
  verifyNumber,
  otpVerificationFormState,
  setOTPVerificationFormErrors,
  setOTPVerificationFormState,
  setIsInputDialogOpen,
  setIsDialogOpen,
  setDialogContent,
  sendOtp,
  setToken,
  token
}: IHandleEditMobileNumber) => {
  if (
    !otpVerificationFormState.otpCountryCode ||
    !otpVerificationFormState.otpMobileNumber
  ) {
    setOTPVerificationFormErrors(prev => ({
      ...prev,
      mobileNumber: 'Please enter Mobile Number to Save'
    }));
  } else {
    if (verifyNumber?.exists === false) {
      setOTPVerificationFormState(prev => ({
        ...prev,
        codeAndNumber: `${otpVerificationFormState.otpCountryCode} ${otpVerificationFormState.otpMobileNumber}`
      }));
      sendOtp({
        phone: otpVerificationFormState.otpMobileNumber,
        country_code: otpVerificationFormState.otpCountryCode,
        resend_token: token.tempToken
      })
        .unwrap()
        .then((res: any) => {
          setToken(prev => ({
            ...prev,
            phoneToken: res.token
          }));
        })
        .catch((e: any) => {
          logger.error(`something went wrong while sending OTP ${e}`);
        });
    } else {
      setIsDialogOpen(true);

      setDialogContent(
        <ErrorModel
          content={'Mobile number already exists'}
          handleClick={() => setIsDialogOpen(false)}
        />
      );
    }

    setIsInputDialogOpen(false);
  }
};
