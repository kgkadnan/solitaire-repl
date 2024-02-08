import { useState } from 'react';
import { IRegister, initialFormState } from '../interface';

export const useRegisterStateManagement = () => {
  const [registerFormState, setRegisterFormState] =
    useState<IRegister>(initialFormState);
  const [registerFormErrors, setRegisterFormErrors] =
    useState<IRegister>(initialFormState);

  return {
    registerState: {
      registerFormState,
      registerFormErrors
    },
    registerSetState: {
      setRegisterFormState,
      setRegisterFormErrors
    }
  };
};
