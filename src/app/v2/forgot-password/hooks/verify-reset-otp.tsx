import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IToken } from '../../register/interface';
import { ManageLocales } from '@/utils/v2/translate';

interface IHandleResetOTP {
  otpValues: string[];
  token: IToken;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  forgotByEmail: boolean;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyResetOTP: any;
  phoneNumber?: any;
  email: string;
  setToken?: any;
}
export const handleResetOTP = ({
  otpValues,
  token,
  setCurrentState,
  setIsDialogOpen,
  setDialogContent,
  verifyResetOTP,
  phoneNumber,
  setToken,
  setIsLoading,
  forgotByEmail,
  email,
  setOtpValues
}: IHandleResetOTP) => {
  const enteredOtp = otpValues.join('');
  setIsLoading(true);

  let payload: any = forgotByEmail
    ? { email: email, token: token.phoneToken, otp: enteredOtp } // If `forgotByEmail` is true, send an email
    : {
        phone: phoneNumber.phoneNumber,
        country_code: phoneNumber.countryCode,
        token: token.phoneToken,
        otp: enteredOtp
      };

  verifyResetOTP({
    data: payload,
    query: forgotByEmail ? 'email' : 'sms' // Use `email` or `sms` for the query dynamically
  })
    .unwrap()
    .then((res: any) => {
      if (res) {
        setToken((prev: any) => ({
          ...prev,
          token: res.access_token || ''
        }));
        setCurrentState('resetPassword');
      }
      setIsLoading(false);
    })
    .catch((e: any) => {
      setIsLoading(false);
      setIsDialogOpen(true);
      setDialogContent(
        <CommonPoppup
          content=""
          header={e?.data?.message}
          actionButtonData={[
            {
              variant: 'primary',
              label: ManageLocales('app.modal.okay'),
              handler: () => {
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
      setOtpValues(['', '', '', '', '', '']);
    });
};
