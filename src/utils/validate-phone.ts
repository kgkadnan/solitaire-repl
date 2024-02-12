import { PHONE_REGEX } from '@/constants/validation-regex/regex';

//Function to validate phone number format
export const isPhoneNumberValid = (number: string) => {
  const phoneRegex = PHONE_REGEX;
  return phoneRegex.test(number);
};
