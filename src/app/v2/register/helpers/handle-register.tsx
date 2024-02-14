import { validateAllFields } from './handle-validate-all-fields';

import { IRegister } from '../interface';
import { IOtp, IToken } from '../page';
import InvalidCreds from '../../login/component/invalid-creds';

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
  setOTPVerificationFormState
}: IHandleRegister) => {
  const isFormValid = validateAllFields({
    formState: registerFormState,
    setFormErrors: setRegisterFormErrors
  }); // Validate all fields

  if (!isFormValid) return; // If the form is not valid, prevent submission
  // If the form is valid, proceed with the form submission (e.g., API call)
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
      if (res) {
        setCurrentState('OTPVerification');
        setRole(role);
        setOTPVerificationFormState(prev => ({
          ...prev,
          otpMobileNumber: `${registerFormState.mobileNumber}`,
          otpCountryCode: `${registerFormState.countryCode}`,
          codeAndNumber: `+${registerFormState.countryCode} ${registerFormState.mobileNumber}`
        }));
        setToken(prev => ({
          ...prev,
          phoneToken: res.customer.phone_token,
          tempToken: res.customer.temp_token
        }));
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
