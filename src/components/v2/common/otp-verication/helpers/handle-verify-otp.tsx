import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IToken } from '@/app/v2/register/interface';

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  setError,
  setIsLoading
}: IHandleVerifyOtp) => {
  const enteredOtp = otpValues.join('');
  setIsLoading(true);
  verifyOTP({
    token: token.phoneToken,
    otp: enteredOtp,
    resend_token: token.tempToken
  })
    .unwrap()
    .then((res: any) => {
      setIsLoading(false);
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
      setIsLoading(false);
      setError(
        `We're sorry, but the OTP you entered is incorrect or has expired`
      );
      setIsDialogOpen(true);
      setDialogContent(
        <CommonPoppup
          content=""
          header={e?.data?.message}
          handleClick={() => setIsDialogOpen(false)}
        />
      );
    });
};
