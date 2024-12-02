// import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/hover-kgk-icon.svg?url';
import { handleRegisterChange } from '../helpers/handle-register-change';
import { handleRegister } from '../helpers/handle-register';
import { IRegisterSetState, IRegisterState } from '../interface';
import { InputField } from '@/components/v2/common/input-field';
import { PasswordField } from '@/components/v2/common/input-field/password';
import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { IOtp, IToken } from './main';
import { isSessionValid } from '@/utils/manage-session';
import { Tracking } from '@/constants/funnel-tracking';
import { useLazyRegisterFunnelQuery } from '@/features/api/funnel';
import { trackEvent } from '@/utils/ga';

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
  setIsLoading: any;
}

const salesPersonData = [
  { key: 101, value: 'Lakshya' },
  { key: 102, value: 'Bharat' },
  { key: 103, value: 'Devanshu' },
  { key: 104, value: 'Sambhav' },
  { key: 105, value: 'Ayush' },
  { key: 106, value: 'Apurv' },
  { key: 107, value: 'Shubham' },
  { key: 108, value: 'Akash' },
  { key: 109, value: 'Sahan' },
  { key: 110, value: 'Rishabh' },
  { key: 111, value: 'Soham' },
  { key: 112, value: 'Shreyans' },
  { key: 113, value: 'Rahul' },
  { key: 114, value: 'Amee' },
  { key: 115, value: 'Sarthak' },
  { key: 116, value: 'Ronak' },
  { key: 117, value: 'Chetan' },
  { key: 118, value: 'Ritik' },
  { key: 119, value: 'Ajay' }
];

const RegisterComponent = ({
  registerSetState,
  registerState,
  register,
  setCurrentState,
  setRole,
  setToken,
  setIsDialogOpen,
  setDialogContent,
  setOTPVerificationFormState,
  setIsLoading
}: IRegisterComponent) => {
  const router = useRouter();
  const pathName = useSearchParams().get('path');
  const [isHovered, setIsHovered] = useState(false);

  const { registerFormState, registerFormErrors } = registerState;
  const { setRegisterFormState, setRegisterFormErrors } = registerSetState;
  let [funnelTrack] = useLazyRegisterFunnelQuery();

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();

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
      setOTPVerificationFormState,
      setIsLoading,
      funnelTrack,
      referralCode
    });
  };

  const [suggestions, setSuggestions] = useState<
    { key: number; value: string }[]
  >([]);
  const [referralName, setReferralName] = useState<string>('');
  const [referralCode, setReferralCode] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReferralName(value);
    if (value) {
      const filteredSuggestions = salesPersonData.filter(person =>
        person.value.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const handleBlur = () => {
    if (
      referralName &&
      !salesPersonData.some(
        person => person.value.toLowerCase() === referralName.toLowerCase()
      ) &&
      suggestions.length === 0
    ) {
      setReferralName('');
    }
  };
  const handleSuggestionClick = (name: string, key: number) => {
    setReferralName(name);
    setReferralCode(key);
    setSuggestions([]);
  };

  useEffect(() => {
    funnelTrack({
      step: Tracking.Register_PageView,
      sessionId: isSessionValid(),
      entryPoint: localStorage.getItem('entryPoint') || ''
    });
    trackEvent({
      action: Tracking.Register_PageView,
      entry_point: localStorage.getItem('entryPoint') || '',
      category: 'Registration'
    });
  }, []);
  return (
    <div className="my-[20px] ">
      <form
        autoComplete="off"
        onSubmit={handleRegisterSubmit}
        className="flex items-center text-center"
      >
        <div className="flex flex-col w-[450px] min-h-[880px] p-8 gap-[24px] rounded-[8px] border-[1px] border-neutral200 mb-[20px]">
          <div
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              funnelTrack({
                step: Tracking.Click_KGK_Logo,
                sessionId: isSessionValid(),
                entryPoint: localStorage.getItem('entryPoint') || ''
              }),
                trackEvent({
                  action: Tracking.Click_KGK_Logo,
                  entry_point: localStorage.getItem('entryPoint') || '',
                  category: 'Registration'
                });
              router.push('/v3');
            }}
          >
            <KgkIcon
              fill={isHovered ? '#5D6969' : '#23302C'}
              alt="KGKlogo"
              // width={60}
              // height={84}
            />
          </div>
          <div className="parent relative">
            <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
          </div>

          <div className="text-headingM text-neutral900 font-medium text-left">
            {ManageLocales('app.register')}
          </div>
          {/* Hidden input fields to trick autofill */}
          <input
            type="text"
            name="fake_user_name"
            autoComplete="username"
            style={{ display: 'none' }}
          />
          <input
            type="password"
            name="fake_password"
            autoComplete="new-password"
            style={{ display: 'none' }}
          />
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
                setRegisterFormErrors
              })
            }
            placeholder={ManageLocales('app.register.firstName.placeholder')}
            styles={{ inputMain: 'h-[64px]' }}
          />

          {/* Input field for last Name */}
          <div className="flex flex-col gap-5">
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
                  setRegisterFormErrors
                })
              }
              placeholder={ManageLocales('app.register.lastName.placeholder')}
              styles={{ inputMain: 'h-[64px]' }}
            />
            {/* Input field for email */}
            <InputField
              label={ManageLocales('app.register.email')}
              onChange={event =>
                handleRegisterChange({
                  event,
                  setRegisterFormState,
                  setRegisterFormErrors
                })
              }
              type="email"
              name="email"
              value={registerFormState.email}
              errorText={registerFormErrors.email}
              placeholder={ManageLocales('app.register.email.placeholder')}
              styles={{ inputMain: 'h-[64px]' }}
              autoComplete="off"
            />

            <InputField
              label="Company Name*"
              onChange={event =>
                handleRegisterChange({
                  event,
                  setRegisterFormState,
                  setRegisterFormErrors
                })
              }
              type="text"
              name="companyName"
              value={registerFormState.companyName}
              errorText={registerFormErrors.companyName}
              placeholder={'Enter name'}
              styles={{ inputMain: 'h-[64px]' }}
              autoComplete="none"
            />
            {/* Input field for mobile Number */}
            <MobileInput
              label={ManageLocales('app.register.mobileNumber')}
              onChange={event =>
                handleRegisterChange({
                  event,
                  setRegisterFormState,
                  setRegisterFormErrors
                })
              }
              type="number"
              name="mobileNumber"
              value={registerFormState.mobileNumber}
              errorText={registerFormErrors.mobileNumber}
              registerFormState={registerFormState}
              setRegisterFormState={setRegisterFormState}
              placeholder={ManageLocales(
                'app.register.mobileNumber.placeholder'
              )}
              maxLength={15}
            />

            {/* Input field for  password */}
            {/* <div> */}
            <PasswordField
              label={'Enter Password*'}
              onChange={event =>
                handleRegisterChange({
                  event,
                  setRegisterFormState,
                  setRegisterFormErrors
                })
              }
              name="password"
              value={registerFormState.password}
              errorText={registerFormErrors.password}
              placeholder={ManageLocales('app.register.password.placeholder')}
              autoComplete="off"
            />
            {/* Input field for confirm password */}
            <PasswordField
              label={ManageLocales('app.register.confirmPassword')}
              onChange={event =>
                handleRegisterChange({
                  event,
                  setRegisterFormState,
                  setRegisterFormErrors
                })
              }
              name="confirmPassword"
              value={registerFormState.confirmPassword}
              errorText={registerFormErrors.confirmPassword}
              placeholder={ManageLocales(
                'app.register.confirmPassword.placeholder'
              )}
              isConfirmPassword={true}
            />
            <InputField
              label="Referred by Salesperson"
              onChange={handleInputChange}
              value={referralName ?? ''}
              placeholder="Salesperson’s Name"
              type=""
              onBlur={handleBlur}
            />
            {suggestions.length > 0 ? (
              <div
                className="border-neutral200 border-[1px] rounded-[4px]"
                style={{
                  marginTop: '-23px',
                  boxShadow: '0px 4px 8px 0px rgba(16, 24, 40, 0.1)'
                }}
              >
                {suggestions.map(person => (
                  <div
                    key={person.key}
                    className="p-2 text-gray-500 w-full hover:bg-neutral50 hover:border-none text-neutral-900 text-left"
                    onClick={() =>
                      handleSuggestionClick(person.value, person.key)
                    }
                  >
                    {person.value}
                  </div>
                ))}
              </div>
            ) : (
              referralName &&
              !salesPersonData.some(
                person =>
                  person.value.toLowerCase() === referralName.toLowerCase()
              ) && (
                <div
                  style={{
                    marginTop: '-23px',
                    boxShadow: '0px 4px 8px 0px rgba(16, 24, 40, 0.1)'
                  }}
                  className="p-2 text-gray-500 border-neutral200 border-[1px] rounded-[4px] w-full"
                >
                  No Result Found
                </div>
              )
            )}
            <div className="flex flex-col gap-1">
              <IndividualActionButton
                variant={'primary'}
                size={'custom'}
                className="rounded-[4px] w-[100%]"
                type="submit"
              >
                {ManageLocales('app.register')}
              </IndividualActionButton>
              <IndividualActionButton
                onClick={() => {
                  funnelTrack({
                    step: Tracking.Click_Login,
                    sessionId: isSessionValid(),
                    entryPoint: localStorage.getItem('entryPoint') || ''
                  }),
                    trackEvent({
                      action: Tracking.Click_Login,
                      entry_point: localStorage.getItem('entryPoint') || '',
                      category: 'Registration'
                    });
                  pathName === 'login'
                    ? router.back()
                    : router.push(`/v2/login?path=register`);
                }}
                className="rounded-[4px] text-neutral600"
                size={'custom'}
                type="button"
              >
                {ManageLocales('app.register.accountExistLogin')}
              </IndividualActionButton>
            </div>
          </div>
        </div>
        <div className="h-[20px]"></div>
      </form>
    </div>
  );
};

export default RegisterComponent;
