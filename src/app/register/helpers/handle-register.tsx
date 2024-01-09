import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { validateAllFields } from './handle-validate-all-fields';
import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import errorImage from '@public/assets/icons/error.svg';
import { IRegister } from '../interface';
import { IToken } from '../page';

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
  setDialogContent
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
    company_name: registerFormState.companyName,
    country_code: registerFormState.countryCode,
    phone: registerFormState.mobileNumber
  })
    .unwrap()
    .then((res: any) => {
      if (res) {
        setCurrentState('OTPVerification');
        setRole(role);

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
        <div className="w-full flex flex-col gap-4 items-center">
          {' '}
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
