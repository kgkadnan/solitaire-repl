import { IsNotEmpty, IsEmail, Length, validate } from 'class-validator';

// Validation functions
export const validateCountry = (value: any) => {
  if (!value) return 'Country is required';
  // Add more complex validation logic if needed
  return null;
};

export const validateOnlineSection = (value: any) => {
  // Assuming this is a complex object, validate accordingly
  if (Object.keys(value.sections).length === 0)
    return 'At least one section is required';
  return null;
};

// Add more validation functions as needed
export const validateScreen = async (formData: any) => {
  console.log("rrrrrrrrrrrrr",formData)
  const userForm = new UserForm(formData.first_name, formData.email, formData.password);
    const validationErrors = await validate(userForm);
console.log(validationErrors,"validationErrors")
  return validationErrors
};
const validateInputField = (fieldName: string, value: string) => {
  switch (fieldName) {
    case 'first_name':
      return value ? undefined : 'First name is required';
    // Add more cases for other fields
    default:
      return undefined;
  }
};


export class UserForm {
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'First name is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  @Length(6, 12, { message: 'Password must be 6-12 characters long' })
  password: string;

  constructor(firstName: string, email: string, password: string) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
  }
}
