export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  companyName: '',
  countryCode: '',
  password: '',
  confirmPassword: ''
};
