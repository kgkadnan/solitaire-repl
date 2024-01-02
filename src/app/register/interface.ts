export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export const initialFormState: IRegister = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  companyName: '',
  countryCode: '',
  password: '',
  confirmPassword: ''
};
