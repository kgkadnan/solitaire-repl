import { useState } from 'react';

const useFormState = (initialState: any) => {
  const [formState, setFormState] = useState(initialState);

  const updateFormState = (path: any, value: any) => {
    setFormState((prevState: any) => {
      const newState = { ...prevState };
      let currentLevel = newState;

      // Iterate over the path and update the corresponding value
      path.slice(0, -1).forEach((key: any) => {
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      });

      currentLevel[path[path.length - 1]] = value;
      return newState;
    });
  };

  return [formState, updateFormState];
};

const initialFormState = {
  country: '',
  online: {
    sections: {}
  },
  offline: null
};

// Usage
const [formState, updateFormState] = useFormState(initialFormState);
