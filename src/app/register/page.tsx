'use client';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React, { useState } from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants/validation-regex/regex';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Select from 'react-select';
import { colourStyles } from '../search/form/helpers/select-colour-style';
import countryCode from './country-code.json';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  companyName: '',
  countryCode: '',
  password: '',
  confirmPassword: ''
};

const Register = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormState>(initialFormState);

  const validateField = (name: string, value: string) => {
    let error = '';

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{9,}$/;

    // Validation logic
    if (value.trim() === '') {
      error = 'This field is required';
    } else {
      switch (name) {
        case 'email':
          if (!EMAIL_REGEX.test(value)) {
            error = 'Invalid email format.';
          }
          break;
        case 'password':
          if (!regexPassword.test(value)) {
            error =
              'Password must be over 8 characters and include at least one uppercase letter, one lowercase letter, and one number';
          }
          if (
            formState.confirmPassword &&
            value !== formState.confirmPassword
          ) {
            error = 'Passwords do not match.';
            setFormErrors(prev => ({
              ...prev,
              confirmPassword: 'Passwords do not match.'
            }));
          }
          break;
        case 'confirmPassword':
          if (value !== formState.password) {
            error = 'Passwords do not match.';
          }
          break;

        default:
          break;
      }
    }

    setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const validateAllFields = () => {
    let errors: FormState = { ...initialFormState };
    let isValid = true;

    // Validate each field
    Object.keys(formState).forEach(key => {
      const fieldError = validateField(key, formState[key as keyof FormState]);
      if (fieldError) {
        isValid = false;
        errors = { ...errors, [key]: fieldError };
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validateAllFields(); // Validate all fields
    if (!isFormValid) return; // If the form is not valid, prevent submission

    // If the form is valid, proceed with the form submission (e.g., API call)
    console.log(formState);
  };
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };
  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      //   handleRegister(e);
    }
  };

  console.log('counjksenf', countryCode.countries);

  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '40px',
              alignItems: 'center'
            }}
          >
            <Image src={handImage} alt="Banner image" />
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
            <div className="flex flex-col gap-[30px]">
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
                  className={`bg-transparent  ${
                    !formErrors.mobileNumber.length
                      ? 'border-solitaireQuaternary text-solitaireTertiary'
                      : 'border-[#983131] text-[#983131]'
                  } border-solitaireQuaternary border-b h-[4.6vh] text-[14px] focus:outline-none`}
                >
                  {countryCode.countries.map(country => (
                    <option
                      key={country.iso_codes}
                      value={`+${country.code}`}
                      className="bg-solitaireSecondary round-0"
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
                <div className="flex flex-col justify-center bg-transparent  border border-2 border-solitaireQuaternary w-[500px] h-[64px]">
                  <Link href={'/'} className="text-[16px] font-medium">
                    {ManageLocales('app.register.registerAsGuest')}
                  </Link>
                </div>
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
  );
};

export default Register;

// Define the Login component
