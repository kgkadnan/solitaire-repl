'use client';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import { FloatingLabelInput } from '@/components/common/floating-input';
import errorImage from '@public/assets/icons/error.svg';
import countryCode from '../../constants/country-code.json';
import { FormState, initialFormState } from './interface';
import { Events } from '@/constants/enums/event';
import { useRegisterMutation } from '@/features/api/register';
import { validateField } from './helpers/validate-field';
import { validateAllFields } from './helpers/handle-validate-all-fields';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useRouter } from 'next/navigation';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import KGKlogo from '@public/assets/icons/vector.svg';
const Register = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormState>(initialFormState);

  const router = useRouter();

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;

  const { data, error } = useGetCountryCodeQuery({});
  const [register] = useRegisterMutation();

  const handleRegister = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const isFormValid = validateAllFields({ formState, setFormErrors }); // Validate all fields

    if (!isFormValid) return; // If the form is not valid, prevent submission
    // If the form is valid, proceed with the form submission (e.g., API call)
    await register({
      first_name: formState.firstName,
      last_name: formState.lastName,
      email: formState.email,
      password: formState.password,
      company_name: formState.companyName,
      country_code: formState.countryCode,
      phone: formState.mobileNumber
    })
      .unwrap()
      .then((res: any) => {
        if (res)
          router.push(
            `/otp-verification?country_code=${formState.countryCode}&phone=${formState.mobileNumber}`
          );
      })
      .catch(e => {
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

  useEffect(() => {
    if (data) {
      setFormState({ ...formState, countryCode: data.country_calling_code });
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [data, error]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    validateField({ name, value, setFormErrors, formState });
  };
  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Events.ENTER) {
      handleRegister(e);
    }
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <UserAuthenticationLayout
        formData={
          <div className="flex justify-center flex-col w-[500px] mt-[250px]">
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
            <form onSubmit={handleRegister}>
              <div className="flex flex-col gap-[40px] mb-[40px]">
                <FloatingLabelInput
                  label={ManageLocales('app.register.firstName')}
                  type="text"
                  name="firstName"
                  onKeyDown={handleKeyDown}
                  errorText={formErrors.firstName}
                  value={formState.firstName}
                  onChange={handleChange}
                />
                {/* Input field for last Name */}
                <FloatingLabelInput
                  label={ManageLocales('app.register.lastName')}
                  type="text"
                  name="lastName"
                  onKeyDown={handleKeyDown}
                  errorText={formErrors.lastName}
                  value={formState.lastName}
                  onChange={handleChange}
                />
                {/* Input field for email */}
                <FloatingLabelInput
                  label={ManageLocales('app.register.email')}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  onKeyDown={handleKeyDown}
                  value={formState.email}
                  errorText={formErrors.email}
                />
                {/* Input field for mobile Number */}
                <div className="flex text-center gap-6">
                  <select
                    name="countryCode"
                    value={formState.countryCode}
                    onChange={handleChange}
                    className={`bg-transparent   ${
                      !formErrors.mobileNumber.length
                        ? 'border-solitaireQuaternary text-solitaireTertiary'
                        : 'border-[#983131] text-[#983131]'
                    } border-b min-h-[43px] h-[43px] text-[14px] focus:outline-none`}
                  >
                    {countryCode.countries.map(country => (
                      <option
                        key={country.iso_codes}
                        value={`+${country.code}`}
                        className="bg-solitaireDenary round-0 border-none"
                      >
                        +{country.code}
                      </option>
                    ))}
                  </select>

                  <FloatingLabelInput
                    label={ManageLocales('app.register.mobileNumber')}
                    onChange={handleChange}
                    type="number"
                    name="mobileNumber"
                    onKeyDown={handleKeyDown}
                    value={formState.mobileNumber}
                    errorText={formErrors.mobileNumber}
                  />
                </div>
                {/* Input field for companyName */}
                <FloatingLabelInput
                  label={ManageLocales('app.register.companyName')}
                  onChange={handleChange}
                  type="text"
                  name="companyName"
                  onKeyDown={handleKeyDown}
                  value={formState.companyName}
                  errorText={formErrors.companyName}
                />
                {/* Input field for  password */}
                <FloatingLabelInput
                  label={ManageLocales('app.register.password')}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  onKeyDown={handleKeyDown}
                  value={formState.password}
                  errorText={formErrors.password}
                  showPassword={true}
                />
                {/* Input field for confirm password */}
                <FloatingLabelInput
                  label={ManageLocales('app.register.confirmPassword')}
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  onKeyDown={handleKeyDown}
                  value={formState.confirmPassword}
                  errorText={formErrors.confirmPassword}
                  showPassword={true}
                />

                <div className="flex flex-col gap-2">
                  {/* Button to trigger the register action */}
                  <CustomDisplayButton
                    displayButtonLabel={ManageLocales(
                      'app.register.registerAsGuest'
                    )}
                    displayButtonAllStyle={{
                      displayButtonStyle:
                        'bg-transparent  border-[1px] border-solitaireQuaternary w-[500px] h-[64px]',
                      displayLabelStyle:
                        'text-solitaireTertiary !text-[16px] font-medium'
                    }}
                    type="submit"
                  />
                  <CustomDisplayButton
                    displayButtonLabel={ManageLocales('app.register')}
                    displayButtonAllStyle={{
                      displayButtonStyle:
                        'bg-solitaireQuaternary w-[500px] h-[64px]',
                      displayLabelStyle:
                        'text-solitaireTertiary text-[16px] font-medium'
                    }}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

export default Register;

// Define the Login component
