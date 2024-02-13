import { IToken } from '@/app/register/page';
import InvalidCreds from '@/app/v2/login/component/invalid-creds';

interface IHandleResetOTP {
  otpValues: string[];
  token: IToken;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  userLoggedIn: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyResetOTP: any;
  phoneNumber?: any;
}
export const handleResetOTP = ({
  otpValues,
  token,
  setCurrentState,
  userLoggedIn,
  setIsDialogOpen,
  setDialogContent,
  verifyResetOTP,
  phoneNumber
}: IHandleResetOTP) => {
  const enteredOtp = otpValues.join('');

  verifyResetOTP({
    token: token,
    otp: enteredOtp,
    phone: phoneNumber.phoneNumber,
    country_code: phoneNumber.countryCode
  })
    .unwrap()
    .then((res: any) => {
      if (res) {
        console.log('jyoti', res);
        userLoggedIn(res.access_token);

        setCurrentState('resetPassword');
      }
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
};
