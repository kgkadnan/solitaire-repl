import { INVALID_PHONE } from '@/constants/error-messages/register';

export const handleLoginInputChange = ({
  event,
  type,
  setPhoneNumber,
  setPhoneErrorText,
  // setErrorText,
  setPasswordErrorText,
  setPassword // setIsError
}: any) => {
  const inputValue = event.target.value;

  if (type === 'phone') {
    setPhoneNumber((prev: any) => ({ ...prev, mobileNumber: inputValue }));

    setPhoneErrorText('');
    // setErrorText('');
  } else if (type === 'password') {
    setPassword(inputValue);
    // setIsError(false);
    // setErrorText('');
    setPasswordErrorText('');
  }
};
