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
  const userForm = new UserForm(
    formData.firstName,
    formData.email,
    formData.password
  );
  const validationErrors = await validate(userForm);
  console.log(validationErrors, 'validationErrors');
  const errors: any = {};

  // Check if certain fields are filled based on the values of other fields
  if (formData.first_name && !formData.last_name) {
    // errors.last_name = 'Last name is required when first name is filled';
  }

  // Add more screen-level validation rules as needed

  return errors;
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

// const handleFieldChange = (fieldName, value) => {
//   // Validate the field
//   const fieldError = validateField(fieldName, value);

//   // Update the form data and errors
//   onChange({
//     ...formData,
//     [fieldName]: value,
//     errors: {
//       ...formData.errors,
//       [fieldName]: fieldError,
//     },
//   });
// };

// const handleScreenValidation = () => {
//   // Validate the entire screen
//   const screenErrors = validateScreen(formData);

//   // Update the form data with screen-level errors
//   onChange({
//     ...formData,
//     errors: {
//       ...formData.errors,
//       ...screenErrors,
//     },
//   });
// };

export class UserForm {
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @Length(6, 12, { message: 'Password must be 6-12 characters long' })
  password: string;

  constructor(firstName: string, email: string, password: string) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
  }
}
