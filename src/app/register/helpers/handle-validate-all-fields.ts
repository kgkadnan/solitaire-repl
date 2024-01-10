import React from 'react';
import { IRegister, initialFormState } from '../interface';
import { validateField } from './validate-field';

interface IValidateAllFields {
  formState: IRegister;
  setFormErrors: React.Dispatch<React.SetStateAction<IRegister>>;
}

export const validateAllFields = ({
  formState,
  setFormErrors
}: IValidateAllFields) => {
  let errors: IRegister = { ...initialFormState };
  let isValid = true;

  // Validate each field
  Object.keys(formState).forEach(key => {
    const fieldError = validateField({
      name: key,
      value: formState[key as keyof IRegister],
      setFormErrors,
      formState
    });
    if (fieldError) {
      isValid = false;
      errors = { ...errors, [key]: fieldError };
    }
  });

  setFormErrors(errors);
  return isValid;
};
