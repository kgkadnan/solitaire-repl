import { SingleValue } from 'react-select';
import { IRegister } from '../interface';

interface IHandleSelectChange {
  selectValue: SingleValue<{ label: string; value: string }>;
  setRegisterFormState: React.Dispatch<React.SetStateAction<IRegister>>;
}
export const handleSelectChange = ({
  selectValue,
  setRegisterFormState
}: IHandleSelectChange) => {
  setRegisterFormState((prev: any) => ({
    ...prev,
    countryCode: selectValue?.value
  }));
};
