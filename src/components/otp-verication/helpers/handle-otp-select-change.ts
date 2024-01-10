import { SingleValue } from 'react-select';
import { IOtp } from '..';

interface IHandleOTPSelectChange {
  selectValue: SingleValue<{ label: string; value: string }>;
  setOTPVerificationFormState: React.Dispatch<React.SetStateAction<IOtp>>;
}
export const handleOTPSelectChange = ({
  selectValue,
  setOTPVerificationFormState
}: IHandleOTPSelectChange) => {
  setOTPVerificationFormState((prev: any) => ({
    ...prev,
    countryCode: selectValue?.value
  }));
};
