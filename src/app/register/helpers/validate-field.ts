import {
  INVALID_EMAIL_FORMAT,
  MINIMUM_CHAR_PASSWORD,
  PASSWORD_NOT_MATCH,
  REQUIRED_FIELD
} from '@/constants/error-messages/register';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX
} from '@/constants/validation-regex/regex';
import { FormState } from '../interface';

interface IValidateField {
  name: string;
  value: string;
  setFormErrors: React.Dispatch<React.SetStateAction<FormState>>;
  formState: FormState;
}
export const validateField = ({
  name,
  value,
  setFormErrors,
  formState
}: IValidateField) => {
  let error = '';

  // Validation logic
  if (value.trim() === '') {
    error = REQUIRED_FIELD;
  } else {
    switch (name) {
      case 'email':
        if (!EMAIL_REGEX.test(value)) {
          error = INVALID_EMAIL_FORMAT;
        }
        break;
      case 'password':
        if (!PASSWORD_REGEX.test(value)) {
          error = MINIMUM_CHAR_PASSWORD;
        }
        if (formState.confirmPassword && value !== formState.confirmPassword) {
          error = PASSWORD_NOT_MATCH;
          setFormErrors(prev => ({
            ...prev,
            confirmPassword: PASSWORD_NOT_MATCH
          }));
        }
        break;
      case 'confirmPassword':
        if (!PASSWORD_REGEX.test(value)) {
          error = MINIMUM_CHAR_PASSWORD;
        }
        if (value !== formState.password) {
          error = PASSWORD_NOT_MATCH;
        }
        break;

      default:
        break;
    }
  }

  setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  return error;
};
