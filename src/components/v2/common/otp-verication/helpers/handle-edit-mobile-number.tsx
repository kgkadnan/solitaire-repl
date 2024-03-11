import { IOtp } from '..';
import logger from 'logging/log-util';
import InvalidCreds from '@/app/v2/login/component/invalid-creds';
import ActionButton from '../../action-button';
import Image from 'next/image';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { IToken } from '@/app/v2/register/interface';
interface IHandleEditMobileNumber {
  otpVerificationFormState: IOtp;
  setOTPVerificationFormErrors: React.Dispatch<React.SetStateAction<IOtp>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  // verifyNumber: any;
  sendOtp: any;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  token?: any;
}
export const handleEditMobileNumber = ({
  // verifyNumber,
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
    !otpVerificationFormState.countryCode ||
    !otpVerificationFormState.otpMobileNumber
  ) {
    setOTPVerificationFormErrors(prev => ({
      ...prev,
      mobileNumber: 'Please enter Mobile Number to Save'
    }));
  } else {
    // if (verifyNumber?.exists === false) {
    setOTPVerificationFormState(prev => ({
      ...prev,
      codeAndNumber: `${otpVerificationFormState.countryCode} ${otpVerificationFormState.otpMobileNumber}`
    }));
    sendOtp({
      phone: otpVerificationFormState.otpMobileNumber,
      country_code: otpVerificationFormState.countryCode,
      resend_token: token.tempToken
    })
      .unwrap()
      .then((res: any) => {
        setToken(prev => ({
          ...prev,
          phoneToken: res.token
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
        // setResendTimer(60);
      })
      .catch((e: any) => {
        setIsDialogOpen(true);
        setDialogContent(
          <InvalidCreds
            content={e?.data?.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
        logger.error(`something went wrong while sending OTP ${e}`);
      });
    // } else {
    //   setIsDialogOpen(true);

    //   setDialogContent(
    //     <InvalidCreds
    //       content={'Mobile number already exists'}
    //       handleClick={() => setIsDialogOpen(false)}
    //     />
    //   );
    // }

    setIsInputDialogOpen(false);
  }
};
