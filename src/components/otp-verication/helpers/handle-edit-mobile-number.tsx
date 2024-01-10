import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { IOtp } from '..';
import Image from 'next/image';
import { ManageLocales } from '@/utils/translate';
import errorImage from '@public/assets/icons/error.svg';
import { IToken } from '@/app/register/page';
interface IHandleEditMobileNumber {
  otpVerificationFormState: IOtp;
  setOTPVerificationFormErrors: React.Dispatch<React.SetStateAction<IOtp>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  verifyNumber: any;
  sendOtp: any;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
}
export const handleEditMobileNumber = ({
  verifyNumber,
  otpVerificationFormState,
  setOTPVerificationFormErrors,
  setOTPVerificationFormState,
  setIsInputDialogOpen,
  setIsDialogOpen,
  setDialogContent,
  sendOtp,
  setToken
}: IHandleEditMobileNumber) => {
  if (
    !otpVerificationFormState.otpCountryCode ||
    !otpVerificationFormState.otpMobileNumber
  ) {
    setOTPVerificationFormErrors(prev => ({
      ...prev,
      mobileNumber: 'Please enter Mobile Number to Save'
    }));
  } else {
    console.log('verifyNumber', verifyNumber);
    if (verifyNumber?.exists === false) {
      setOTPVerificationFormState(prev => ({
        ...prev,
        codeAndNumber: `${otpVerificationFormState.otpCountryCode} ${otpVerificationFormState.otpMobileNumber}`
      }));
      sendOtp({
        phone: otpVerificationFormState.otpMobileNumber,
        country_code: otpVerificationFormState.otpCountryCode
      })
        .unwrap()
        .then((res: any) => {
          setToken(prev => ({
            ...prev,
            phoneToken: res.token
          }));
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else {
      setIsDialogOpen(true);

      setDialogContent(
        <div className="w-full flex flex-col gap-4 items-center">
          {' '}
          <div className=" flex justify-center align-middle items-center">
            <Image src={errorImage} alt="errorImage" />
            <p>Error!</p>
          </div>
          <div className="text-center text-solitaireTertiary h-[4vh]">
            Mobile number already exists
          </div>
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.register.okay')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[36px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              setIsDialogOpen(false);
            }}
          />
        </div>
      );
    }

    setIsInputDialogOpen(false);
  }
};
