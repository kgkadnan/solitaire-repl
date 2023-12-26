import { FormState, initialFormState } from '../interface';
import { validateField } from './validate-field';

interface IValidateAllFields {
  formState: FormState;
  setFormErrors: React.Dispatch<React.SetStateAction<FormState>>;
}

export const validateAllFields = ({
  formState,
  setFormErrors
}: IValidateAllFields) => {
  let errors: FormState = { ...initialFormState };
  let isValid = true;

  // Validate each field
  Object.keys(formState).forEach(key => {
    const fieldError = validateField({
      name: key,
      value: formState[key as keyof FormState],
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
