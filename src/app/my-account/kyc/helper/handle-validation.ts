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
