import { INVALID_PHONE } from '@/constants/error-messages/register';

export const handleLoginInputChange = ({
  event,
  type,
  setPhoneNumber,
  setPhoneErrorText,
  setPasswordErrorText,
  setPassword,
  setEmail,
  setEmailErrorText
}: any) => {
  const inputValue = event.target.value;

  if (type === 'phone') {
    setPhoneNumber((prev: any) => ({ ...prev, mobileNumber: inputValue }));

    setPhoneErrorText('');
  } else if (type === 'password') {
    setPassword(inputValue);
    setPasswordErrorText('');
  } else if (type === 'email') {
    setEmail(inputValue);
    setEmailErrorText('');
  }
};
