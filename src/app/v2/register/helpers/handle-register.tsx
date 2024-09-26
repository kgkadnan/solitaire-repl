import { validateAllFields } from './handle-validate-all-fields';

import { IRegister } from '../interface';
import CommonPoppup from '../../login/component/common-poppup';
import { statusCode } from '@/constants/enums/status-code';
import { IOtp, IToken } from '../component/main';
import { isSessionValid } from '@/utils/manage-session';
import { Tracking } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

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
  funnelTrack: any;
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
  setIsLoading,
  funnelTrack
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
    phone: registerFormState.mobileNumber,
    company_name: registerFormState.companyName,
    country_iso2_code: registerFormState.iso
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
        funnelTrack({
          step: Tracking.Click_Register,
          status: 'Success',
          sessionId: isSessionValid(),
          mobileNumber: `+${registerFormState.countryCode} ${registerFormState.mobileNumber}`,
          entryPoint: localStorage.getItem('entryPoint') || ''
        });
        trackEvent({
          action: Tracking.Click_Register,
          label: Tracking.Click_Register,
          entry_point: localStorage.getItem('entryPoint') || '',
          mobile_number: `+${registerFormState.countryCode} ${registerFormState.mobileNumber}`,
          status: 'Success',
          category: 'Register'

          // }
        });
      }
    })
    .catch((e: any) => {
      setIsLoading(false);
      setIsDialogOpen(true);
      funnelTrack({
        step: Tracking.Click_Register,
        status: 'Fail',
        sessionId: isSessionValid(),
        mobileNumber: `+${registerFormState.countryCode} ${registerFormState.mobileNumber}`,
        entryPoint: localStorage.getItem('entryPoint') || ''
      });
      trackEvent({
        action: Tracking.Click_Register,
        label: Tracking.Click_Register,
        entry_point: localStorage.getItem('entryPoint') || '',
        mobile_number: `+${registerFormState.countryCode} ${registerFormState.mobileNumber}`,
        status: 'Fail',
        category: 'Register'

        // }
      });
      if (e.status === statusCode.DUPLICATE && e.data.field === 'email') {
        setDialogContent(
          <CommonPoppup
            content="Email already in use. Please log in with the mobile number linked to this email."
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
          <CommonPoppup
            content="This mobile number is already registered. Please log in or use a different number."
            header={'Duplicate phone no'}
            handleClick={() => setIsDialogOpen(false)}
            buttonText={'Okay'}
          />
        );
      } else {
        setDialogContent(
          <CommonPoppup
            content=""
            header={e?.data?.message}
            handleClick={() => setIsDialogOpen(false)}
            buttonText={'Edit Selection'}
          />
        );
      }
    });
};
