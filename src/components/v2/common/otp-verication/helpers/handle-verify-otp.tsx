import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IToken } from '@/app/v2/register/interface';
import { Tracking } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';
import { isSessionValid } from '@/utils/manage-session';

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
  funnelTrack?: any;
  phone?: any;
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
  setIsLoading,
  funnelTrack,
  phone
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
        funnelTrack &&
          phone &&
          funnelTrack({
            step: Tracking.Click_Verify,
            status: 'Success',
            sessionId: isSessionValid(),
            mobileNumber: `+${phone}`,
            entryPoint: localStorage.getItem('entryPoint') || ''
          });
        trackEvent({
          action: Tracking.Click_Verify,
          label: Tracking.Click_Verify,
          mobile_number: `+${phone}`,
          status: 'Fail',
          entry_point: localStorage.getItem('entryPoint') || '',
          category: 'Registration'
        });
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
      funnelTrack &&
        phone &&
        funnelTrack({
          step: Tracking.Click_Verify,
          status: 'Fail',
          sessionId: isSessionValid(),
          mobileNumber: `+${phone}`,
          entryPoint: localStorage.getItem('entryPoint') || ''
        });
      trackEvent({
        action: Tracking.Click_Verify,
        label: Tracking.Click_Verify,
        mobile_number: `+${phone}`,
        status: 'Fail',
        entry_point: localStorage.getItem('entryPoint') || '',
        category: 'Registration'
      });
    });
};
