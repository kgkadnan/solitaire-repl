import { INVALID_PHONE } from '@/constants/error-messages/register';

export const handleLoginInputChange = ({
  event,
  type,
  setPhoneNumber,
  isPhoneNumberValid,
  setEmailErrorText,
  setErrorText,
  setPasswordErrorText,
  setPassword,
  setIsError
}: any) => {
  const inputValue = event.target.value;

  if (type === 'phone') {
    setPhoneNumber((prev: any) => ({ ...prev, mobileNumber: inputValue }));

    if (isPhoneNumberValid(inputValue)) {
      setEmailErrorText('');
      setErrorText('');
    } else {
      setEmailErrorText(INVALID_PHONE);
      setErrorText('');
    }
  } else if (type === 'password') {
    setPassword(inputValue);
    setIsError(false);
    setErrorText('');
    setPasswordErrorText('');
  }
};
