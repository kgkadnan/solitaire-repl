export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  iso: string;
  referralCode: string;
}

export const initialFormState: IRegister = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  mobileNumber: '',
  countryCode: '',
  password: '',
  confirmPassword: '',
  iso: '',
  referralCode: ''
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
