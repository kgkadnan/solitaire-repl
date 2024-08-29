import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { IToken } from '../../register/interface';
import { ManageLocales } from '@/utils/v2/translate';

interface IHandleResetOTP {
  otpValues: string[];
  token: IToken;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyResetOTP: any;
  phoneNumber?: any;
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
  setIsLoading
}: IHandleResetOTP) => {
  const enteredOtp = otpValues.join('');
  setIsLoading(true);
  verifyResetOTP({
    token: token.phoneToken,
    otp: enteredOtp,
    phone: phoneNumber.phoneNumber,
    country_code: phoneNumber.countryCode
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
    });
};
