// Function to validate phone number format
// const isPhoneNumberValid = (number: string) => {
//   const phoneRegex = PHONE_REGEX;
//   return phoneRegex.test(number);
// };

import { INVALID_EMAIL_FORMAT } from '@/constants/error-messages/register';

export const handleLoginInputChange = ({
  event,
  type,
  setEmailAndNumber,
  isEmailValid,
  setEmailErrorText,
  setErrorText,
  setPasswordErrorText,
  setPassword,
  setIsError
}: any) => {
  const inputValue = event.target.value;

  if (type === 'email') {
    setEmailAndNumber(inputValue);

    // if (isEmailValid(inputValue) || isPhoneNumberValid(inputValue)) {
    if (isEmailValid(inputValue)) {
      setEmailErrorText('');
      setErrorText('');
    } else {
      setEmailErrorText(INVALID_EMAIL_FORMAT);
      setErrorText('');
    }
  } else if (type === 'password') {
    setPassword(inputValue);
    setIsError(false);
    setErrorText('');
    setPasswordErrorText('');
  }
};
