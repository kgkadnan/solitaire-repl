import { IRegister } from '../interface';
import { validateField } from './validate-field';

interface IHandleChange {
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;
  setRegisterFormState: React.Dispatch<React.SetStateAction<IRegister>>;
  setRegisterFormErrors: React.Dispatch<React.SetStateAction<IRegister>>;
}
export const handleRegisterChange = ({
  event,
  setRegisterFormState,
  setRegisterFormErrors
}: IHandleChange) => {
  const { name, value } = event.target;
  setRegisterFormState((prev: any) => ({ ...prev, [name]: value }));
  setRegisterFormErrors((prev: any) => ({ ...prev, [name]: '' }));
};
