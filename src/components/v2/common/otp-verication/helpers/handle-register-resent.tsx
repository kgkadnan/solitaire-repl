import Image from 'next/image';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IOtp } from '..';
import ActionButton from '../../action-button';
import { IToken } from '@/app/v2/register/component/main';
interface IHandleResendOTP {
  otpVerificationFormState: IOtp;
  setResendTimer: React.Dispatch<React.SetStateAction<number>>;
  sendOtp: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  token: any;
}
export const handleRegisterResendOTP = ({
  otpVerificationFormState,
  setResendTimer,
  sendOtp,
  setIsDialogOpen,
  setDialogContent,
  setToken,
  token
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
        <>
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={successIcon} alt="successIcon" />
          </div>
          <h1 className="text-headingS text-neutral900">
            OTP sent successfully
          </h1>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
            <ActionButton
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
          </div>
        </>
      );
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
