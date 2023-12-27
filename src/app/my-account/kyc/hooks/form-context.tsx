import { createContext, useState } from 'react';
interface FormContextType {
  formState: { [key: string]: any };
  formErrors: { [key: string]: string | null };
  updateFormState: (name: string, value: any) => void;
  updateFormErrors: (name: string, error: string | null) => void;
}

// Create a default value that matches the shape of your context
const defaultContextValue: FormContextType = {
  formState: {},
  updateFormState: () => {},
  formErrors: {},
  updateFormErrors: () => {}
};

export const FormContext = createContext<FormContextType>(defaultContextValue);

export const FormProvider = ({ children }: any) => {
  const [formState, setFormState] = useState<{ [key: string]: any }>({});
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const updateFormState = (name: string, value: any) => {
    setFormState({ ...formState, [name]: value });
    // Optionally clear errors when the field is updated
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const updateFormErrors = (name: string, error: string | null) => {
    setFormErrors({ ...formErrors, [name]: error });
  };

  return (
    <FormContext.Provider
      value={{ formState, formErrors, updateFormState, updateFormErrors }}
    >
      {children}
    </FormContext.Provider>
  );
};
