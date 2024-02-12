import { IOtp } from '..';

interface IHandleOTPChange {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
}
export const handleOTPChange = ({
  event,
  setOTPVerificationFormState
}: IHandleOTPChange) => {
  const { name, value } = event.target;
  setOTPVerificationFormState(prev => ({ ...prev, [name]: value }));
};
