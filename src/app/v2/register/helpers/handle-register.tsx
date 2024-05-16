import { validateAllFields } from './handle-validate-all-fields';

import { IRegister } from '../interface';
import InvalidCreds from '../../login/component/invalid-creds';
import { statusCode } from '@/constants/enums/status-code';
import { IOtp, IToken } from '../component/main';

interface IHandleRegister {
  role: string;
  registerFormState: IRegister;
  setRegisterFormErrors: React.Dispatch<React.SetStateAction<IRegister>>;
  register: any;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
  setIsLoading: any;
}
export const handleRegister = async ({
  role,
  registerFormState,
  setRegisterFormErrors,
  register,
  setCurrentState,
  setRole,
  setToken,
  setIsDialogOpen,
  setDialogContent,
  setOTPVerificationFormState,
  setIsLoading
}: IHandleRegister) => {
  const isFormValid = validateAllFields({
    formState: registerFormState,
    setFormErrors: setRegisterFormErrors
  }); // Validate all fields
  if (!isFormValid) return; // If the form is not valid, prevent submission
  // If the form is valid, proceed with the form submission (e.g., API call)
  setIsLoading(true);

  await register({
    first_name: registerFormState.firstName,
    last_name: registerFormState.lastName,
    email: registerFormState.email,
    password: registerFormState.password,
    country_code: registerFormState.countryCode,
    phone: registerFormState.mobileNumber
  })
    .unwrap()
    .then((res: any) => {
      setIsLoading(false);
      if (res?.customer) {
        localStorage.removeItem('show-nudge');
        setCurrentState('OTPVerification');
        setRole(role);
        setOTPVerificationFormState(prev => ({
          ...prev,
          otpMobileNumber: `${registerFormState.mobileNumber}`,
          countryCode: `${registerFormState.countryCode}`,
          codeAndNumber: `${registerFormState.countryCode} ${registerFormState.mobileNumber}`
        }));
        setToken(prev => ({
          ...prev,
          phoneToken: res.customer.phone_token,
          tempToken: res.customer.temp_token
        }));
      }
    })
    .catch((e: any) => {
      setIsLoading(false);
      setIsDialogOpen(true);
      if (e.status === statusCode.DUPLICATE && e.data.field === 'email') {
        setDialogContent(
          <InvalidCreds
            content="Please log in with the mobile number linked to this email."
            header={'Duplicate email.'}
            handleClick={() => setIsDialogOpen(false)}
            buttonText={'Okay'}
          />
        );
      } else if (
        e.status === statusCode.DUPLICATE &&
        e.data.field === 'mobile'
      ) {
        setDialogContent(
          <InvalidCreds
            content="Please log in or use a different number."
            header={'Duplicate phone number.'}
            handleClick={() => setIsDialogOpen(false)}
            buttonText={'Okay'}
          />
        );
      } else {
        setDialogContent(
          <InvalidCreds
            content=""
            header={e?.data?.message}
            handleClick={() => setIsDialogOpen(false)}
            buttonText={'Edit Selection'}
          />
        );
      }
    });
};
