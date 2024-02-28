import { IToken } from '@/app/register/page';
import InvalidCreds from '@/app/v2/login/component/invalid-creds';

interface IHandleVerifyOtp {
  otpValues: string[];
  token: IToken;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  userLoggedIn: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyOTP: any;
  role: string;
  setToken?: React.Dispatch<React.SetStateAction<IToken>>;
  setError: any;
}
export const handleVerifyOtp = ({
  otpValues,
  token,
  setCurrentState,
  userLoggedIn,
  setIsDialogOpen,
  setDialogContent,
  verifyOTP,
  role,
  setToken,
  setError
}: IHandleVerifyOtp) => {
  const enteredOtp = otpValues.join('');

  verifyOTP({
    token: token.phoneToken,
    otp: enteredOtp,
    resend_token: token.tempToken
  })
    .unwrap()
    .then((res: any) => {
      if (res) {
        if (role === 'register') {
          setCurrentState('successfullyCreated');
          if (setToken)
            setToken(prev => ({
              ...prev,
              token: res.access_token
            }));
          userLoggedIn(res.access_token);
          localStorage.setItem('user', JSON.stringify(res));
        } else if (role === 'login') {
          setCurrentState('successfullyCreated');
          userLoggedIn(res.access_token);
          localStorage.setItem('user', JSON.stringify(res));
        }
      }
    })
    .catch((e: any) => {
      setError(
        `We're sorry, but the OTP you entered is incorrect or has expired`
      );
      setIsDialogOpen(true);
      setDialogContent(
        <InvalidCreds
          content={e?.data?.message}
          handleClick={() => setIsDialogOpen(false)}
        />
      );
    });
};
