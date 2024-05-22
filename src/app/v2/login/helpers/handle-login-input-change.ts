import { INVALID_PHONE } from '@/constants/error-messages/register';

export const handleLoginInputChange = ({
  event,
  type,
  setPhoneNumber,
  setPhoneErrorText,
  setPasswordErrorText,
  setPassword
}: any) => {
  const inputValue = event.target.value;

  if (type === 'phone') {
    setPhoneNumber((prev: any) => ({ ...prev, mobileNumber: inputValue }));

    setPhoneErrorText('');
  } else if (type === 'password') {
    setPassword(inputValue);
    setPasswordErrorText('');
  }
};
