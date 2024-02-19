import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import InvalidCreds from '@/app/v2/login/component/invalid-creds';
import { IOtp } from '..';
import { IToken } from '@/app/v2/register/page';
interface IHandleResendOTP {
  otpVerificationFormState: IOtp;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  sendOtp: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
}
export const handleResendOTP = ({
  otpVerificationFormState,
  setResendTimer,
  sendOtp,
  setIsDialogOpen,
  setDialogContent,
  setToken
}: IHandleResendOTP) => {
  sendOtp({
    phone: otpVerificationFormState.otpMobileNumber,
    country_code: otpVerificationFormState.countryCode
  })
    .unwrap()
    .then((res: any) => {
      setToken(prev => ({
        ...prev,
        phoneToken: res?.token || ''
      }));
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[380px] flex justify-center align-middle">
            <Image src={confirmImage} alt="vector image" />
          </div>
          <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
            OTP Send Successfully..
          </div>
        </>
      );
      setResendTimer(60);
    })
    .catch((e: any) => {
      setIsDialogOpen(true);
      setDialogContent(
        <InvalidCreds
          content={e?.data?.message}
          handleClick={() => setIsDialogOpen(false)}
        />
      );
    });
  // Add logic to resend the OTP, e.g., API call
  // Reset the timer to 60 seconds
};
