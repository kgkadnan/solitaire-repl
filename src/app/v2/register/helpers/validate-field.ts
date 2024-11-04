import React from 'react';

import {
  INVALID_EMAIL_FORMAT,
  INVALID_PHONE,
  PLEASE_ENTER_VALID_PASSWORD,
  PASSWORD_NOT_MATCH,
  REQUIRED_FIELD
} from '@/constants/error-messages/register';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX
} from '@/constants/validation-regex/regex';
import { IRegister } from '../interface';

const formatFieldName = (fieldName: string): string => {
  // Split the field name by uppercase letters and join with a space
  const formatted = fieldName
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return formatted;
};

interface IValidateField {
  name: string;
  value: string;
  setFormErrors: React.Dispatch<React.SetStateAction<IRegister>>;
  formState: IRegister;
}
export const validateField = ({
  name,
  value,
  setFormErrors,
  formState
}: IValidateField) => {
  let error = '';

  // Validation logic
  if (value.trim() === '' && name !== 'referralName') {
    error = `${formatFieldName(name)} is mandatory`;
  } else {
    switch (name) {
      case 'email':
        if (!EMAIL_REGEX.test(value)) {
          error = INVALID_EMAIL_FORMAT;
        }
        break;
      case 'mobileNumber':
        if (!PHONE_REGEX.test(value)) {
          error = INVALID_PHONE;
        }
        break;

      // Inside your form validation logic
      case 'password':
        if (!PASSWORD_REGEX.test(value)) {
          error = PLEASE_ENTER_VALID_PASSWORD;
        }
        // Clear confirmPassword error if it was set
        setFormErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
        if (formState.confirmPassword && value !== formState.confirmPassword) {
          error = PASSWORD_NOT_MATCH;
          // Set confirmPassword error
          setFormErrors(prev => ({
            ...prev,
            confirmPassword: PASSWORD_NOT_MATCH
          }));
        }
        break;

      case 'confirmPassword':
        if (!PASSWORD_REGEX.test(value)) {
          error = PLEASE_ENTER_VALID_PASSWORD;
        }
        // Clear password error if it was set
        setFormErrors(prev => ({
          ...prev,
          password: ''
        }));
        if (value !== formState.password) {
          error = PASSWORD_NOT_MATCH;
          // Set password error
          setFormErrors(prev => ({
            ...prev,
            password: PASSWORD_NOT_MATCH
          }));
        }
        break;

      default:
        break;
    }
  }

  setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  return error;
};
