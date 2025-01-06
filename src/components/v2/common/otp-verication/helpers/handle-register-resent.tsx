import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IOtp } from '..';
import { IToken } from '@/app/v2/register/component/main';
interface IHandleResendOTP {
  otpVerificationFormState: IOtp;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  sendOtp: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  token: any;
}
export const handleRegisterResendOTP = ({
  otpVerificationFormState,
  setResendTimer,
  sendOtp,
  setIsDialogOpen,
  setDialogContent,
  setToken,
  token,
  setOtpValues
}: IHandleResendOTP) => {
  sendOtp({
    phone: otpVerificationFormState.otpMobileNumber,
    country_code: otpVerificationFormState.countryCode,
    resend_token: token.tempToken
  })
    .unwrap()
    .then((res: any) => {
      setToken(prev => ({
        ...prev,
        phoneToken: res?.token || ''
      }));
      setIsDialogOpen(true);
      setDialogContent(
        <CommonPoppup
          content={''}
          status="success"
          customPoppupBodyStyle="!mt-[70px]"
          header={'OTP sent successfully'}
          actionButtonData={[
            {
              variant: 'primary',
              label: 'Okay',
              handler: () => {
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
      setOtpValues(['', '', '', '', '', '']);
      setResendTimer(60);
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
    });
  // Add logic to resend the OTP, e.g., API call
  // Reset the timer to 60 seconds
};
