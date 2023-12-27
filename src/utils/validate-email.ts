import { EMAIL_REGEX } from '@/constants/validation-regex/regex';

// Function to validate email format
export const isEmailValid = (email: string) => {
  // Regular expression for basic email validation
  const emailRegex = EMAIL_REGEX;
  return emailRegex.test(email);
};
