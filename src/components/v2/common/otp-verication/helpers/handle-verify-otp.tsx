import { IToken } from '@/app/register/page';
import ErrorModel from '@/components/common/error-model';

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
  setToken
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
        } else if (role === 'login') {
          setCurrentState('successfullyCreated');
          userLoggedIn(res.access_token);
        }
      }
    })
    .catch((e: any) => {
      setIsDialogOpen(true);
      setDialogContent(
        <ErrorModel
          content={e?.data?.message}
          handleClick={() => setIsDialogOpen(false)}
        />
      );
    });
};
