export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  iso?: string;
}

export const initialFormState: IRegister = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  countryCode: '',
  password: '',
  confirmPassword: '',
  iso: ''
};

export interface IRegisterSetState {
  setRegisterFormState: React.Dispatch<React.SetStateAction<IRegister>>;
  setRegisterFormErrors: React.Dispatch<React.SetStateAction<IRegister>>;
}
export interface IRegisterState {
  registerFormState: IRegister;
  registerFormErrors: IRegister;
}
export interface IToken {
  token: string;
  phoneToken: string;
  tempToken: string;
}
