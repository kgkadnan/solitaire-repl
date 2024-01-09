import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import errorImage from '@public/assets/icons/error.svg';
import { IToken } from '@/app/register/page';

interface IHandleVerifyOtp {
  otpValues: string[];
  token: IToken;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  router: any;
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
  router,
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
        if (role === 'guest') {
          router.push('/');
        } else {
          setCurrentState('successfullyCreated');
        }
        if (setToken)
          setToken(prev => ({
            ...prev,
            token: res.access_token
          }));
        userLoggedIn(res.access_token);
      }
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
};
