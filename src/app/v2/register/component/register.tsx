import Image from 'next/image';
import React from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { handleRegisterChange } from '../helpers/handle-register-change';
import { handleRegister } from '../helpers/handle-register';
import { IRegisterSetState, IRegisterState } from '../interface';
import { IOtp, IToken } from '../page';
import { InputField } from '@/components/v2/common/input-field';
import { PasswordField } from '@/components/v2/common/input-field/password';
import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter } from 'next/navigation';
import { MobileInput } from '@/components/v2/common/input-field/mobile';

interface IRegisterComponent {
  registerSetState: IRegisterSetState;
  registerState: IRegisterState;
  register: any;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setToken: React.Dispatch<React.SetStateAction<IToken>>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
}
const RegisterComponent = ({
  registerSetState,
  registerState,
  register,
  setCurrentState,
  setRole,
  setToken,
  setIsDialogOpen,
  setDialogContent,
  setOTPVerificationFormState
}: IRegisterComponent) => {
  const router = useRouter();

  const { registerFormState, registerFormErrors } = registerState;
  const { setRegisterFormState, setRegisterFormErrors } = registerSetState;
  return (
    <div className="my-[20px]">
      <div className="flex flex-col w-[450px] min-h-[880px] p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral-200">
        <div className="flex flex-col items-center">
          <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />
        </div>
        <div className="parent relative">
          <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
        </div>

        <div className="text-headingM text-neutral-900 font-medium text-left">
          {ManageLocales('app.register')}
        </div>
        <InputField
          label={ManageLocales('app.register.firstName')}
          type="text"
          name="firstName"
          errorText={registerFormErrors.firstName}
          value={registerFormState.firstName}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          placeholder={ManageLocales('app.register.firstName.placeholder')}
        />

        {/* Input field for last Name */}
        <InputField
          label={ManageLocales('app.register.lastName')}
          type="text"
          name="lastName"
          errorText={registerFormErrors.lastName}
          value={registerFormState.lastName}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          placeholder={ManageLocales('app.register.lastName.placeholder')}
        />
        {/* Input field for email */}
        <InputField
          label={ManageLocales('app.register.email')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          type="email"
          name="email"
          value={registerFormState.email}
          errorText={registerFormErrors.email}
          placeholder={ManageLocales('app.register.email.placeholder')}
        />
        {/* Input field for mobile Number */}
        <MobileInput
          label={ManageLocales('app.register.mobileNumber')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          type="number"
          name="mobileNumber"
          value={registerFormState.mobileNumber}
          errorText={registerFormErrors.mobileNumber}
          registerFormState={registerFormState}
          setRegisterFormState={setRegisterFormState}
          placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
        />

        {/* Input field for  password */}
        <PasswordField
          label={ManageLocales('app.register.password')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          name="password"
          value={registerFormState.password}
          errorText={registerFormErrors.password}
          placeholder={ManageLocales('app.register.password.placeholder')}
        />
        {/* Input field for confirm password */}
        <PasswordField
          label={ManageLocales('app.register.confirmPassword')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          name="confirmPassword"
          value={registerFormState.confirmPassword}
          errorText={registerFormErrors.confirmPassword}
          placeholder={ManageLocales(
            'app.register.confirmPassword.placeholder'
          )}
        />
        <IndividualActionButton
          onClick={() =>
            handleRegister({
              role: 'register',
              registerFormState,
              setRegisterFormErrors,
              register,
              setCurrentState,
              setRole,
              setToken,
              setIsDialogOpen,
              setDialogContent,
              setOTPVerificationFormState
            })
          }
          variant={'primary'}
          size={'custom'}
          className="rounded-[4px]"
        >
          {ManageLocales('app.register')}
        </IndividualActionButton>
        <IndividualActionButton
          onClick={() => {
            router.push(`login`);
          }}
          className="rounded-[4px] text-neutral-600"
          size={'custom'}
        >
          {ManageLocales('app.register.accountExistLogin')}
        </IndividualActionButton>
      </div>
    </div>
  );
};

export default RegisterComponent;
