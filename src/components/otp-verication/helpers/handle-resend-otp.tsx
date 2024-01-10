import { IOtp, IToken } from '@/app/register/page';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import errorImage from '@public/assets/icons/error.svg';
import { ManageLocales } from '@/utils/translate';
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
    country_code: otpVerificationFormState.otpCountryCode
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
        <div className="w-full flex flex-col gap-4 items-center">
          <div className=" flex justify-center align-middle items-center">
            <Image src={errorImage} alt="errorImage" />
            <p>Error!</p>
          </div>
          <div className="text-center text-solitaireTertiary h-[4vh]">
            {e.data.message}
          </div>

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
    });
  // Add logic to resend the OTP, e.g., API call
  // Reset the timer to 60 seconds
};
