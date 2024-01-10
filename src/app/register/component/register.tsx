import { computeCountryDropdownField } from '@/app/my-account/kyc/helper/compute-country-dropdown';
import { countryCodeSelectStyle } from '@/app/my-account/kyc/styles/country-code-select-style';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import countryCode from '../../../constants/country-code.json';
import Image from 'next/image';
import React from 'react';
import KGKlogo from '@public/assets/icons/vector.svg';
import Select from 'react-select';
import { handleSelectChange } from '../helpers/handle-select-change';
import { handleRegisterChange } from '../helpers/handle-register-change';
import { handleRegister } from '../helpers/handle-register';
import { IRegisterSetState, IRegisterState } from '../interface';
import { IOtp, IToken } from '../page';

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
  const { registerFormState, registerFormErrors } = registerState;
  const { setRegisterFormState, setRegisterFormErrors } = registerSetState;
  return (
    <div className="flex justify-center flex-col w-[500px] xl:mt-[200px] lg:mt-[280px] md:mt-[300px] sm:mt-[300px]">
      <div className="flex flex-col gap-[5px] mb-[20px] items-center">
        <Image src={KGKlogo} alt="KGKlogo" width={60} height={60} />
        <CustomInputlabel
          htmlfor={''}
          label={ManageLocales('app.register')}
          overriddenStyles={{
            label: 'text-solitaireQuaternary text-[40px] font-semibold'
          }}
        />
        <div className="">
          <p className="text-solitaireTertiary">
            {ManageLocales('app.register.welcomeMessage')}
          </p>
        </div>
      </div>

      {/* Input field for first Name */}

      <div className="flex flex-col gap-[40px] mb-[40px]">
        <FloatingLabelInput
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
        />
        {/* Input field for last Name */}
        <FloatingLabelInput
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
        />
        {/* Input field for email */}
        <FloatingLabelInput
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
        />
        {/* Input field for mobile Number */}
        <div className="flex text-center gap-6">
          <div className="w-[18%] ">
            <Select
              name="countryCode"
              options={computeCountryDropdownField(countryCode)}
              onChange={selectValue =>
                handleSelectChange({ selectValue, setRegisterFormState })
              }
              styles={countryCodeSelectStyle(registerFormErrors.countryCode)}
              value={{
                label: registerFormState.countryCode,
                value: registerFormState.countryCode
              }}
            />
          </div>

          <div className="w-[75%]">
            {' '}
            <FloatingLabelInput
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
            />
          </div>
        </div>
        {/* Input field for companyName */}
        <FloatingLabelInput
          label={ManageLocales('app.register.companyName')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          type="text"
          name="companyName"
          value={registerFormState.companyName}
          errorText={registerFormErrors.companyName}
        />
        {/* Input field for  password */}
        <FloatingLabelInput
          label={ManageLocales('app.register.password')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          type="password"
          name="password"
          value={registerFormState.password}
          errorText={registerFormErrors.password}
          showPassword={true}
        />
        {/* Input field for confirm password */}
        <FloatingLabelInput
          label={ManageLocales('app.register.confirmPassword')}
          onChange={event =>
            handleRegisterChange({
              event,
              setRegisterFormState,
              setRegisterFormErrors,
              registerFormState
            })
          }
          type="password"
          name="confirmPassword"
          value={registerFormState.confirmPassword}
          errorText={registerFormErrors.confirmPassword}
          showPassword={true}
        />

        <div className="flex flex-col gap-2">
          {/* Button to trigger the register action */}
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.register.registerAsAGuest')}
            displayButtonAllStyle={{
              displayButtonStyle:
                'bg-transparent  border-[1px] border-solitaireQuaternary w-[500px] h-[54px]',
              displayLabelStyle:
                'text-solitaireTertiary !text-[16px] font-medium'
            }}
            handleClick={() =>
              handleRegister({
                role: 'guest',
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
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.register')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[500px] h-[54px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() =>
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
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
