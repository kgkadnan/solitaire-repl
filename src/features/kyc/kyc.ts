import {
  validateCountry,
  validateOnlineSection
} from '@/app/my-account/kyc/helper/handle-validation';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formState: {
    country: '',
    online: { sections: {} },
    offline: null
  },
  formErrorState: {
    country: '',
    online: { sections: {} },
    offline: null
  }
};

const setNestedValue = (obj: any, path: string, value: string) => {
  const keys = path.split(/[\.\[\]]+/).filter(Boolean); // Split by '.', '[', and ']' and filter out empty strings
  const lastKey = keys.pop();

  let currentObj = obj;

  // Traverse the object based on the path
  keys.forEach(key => {
    // Handle array indices
    const indexMatch = key.match(/^(\w+)(\d+)?$/);
    if (indexMatch) {
      const [, arrayKey, arrayIndex] = indexMatch;
      if (arrayIndex !== undefined) {
        currentObj = currentObj[arrayKey] = currentObj[arrayKey] || [];
        currentObj = currentObj[arrayIndex] = currentObj[arrayIndex] || {};
      } else {
        currentObj = currentObj[arrayKey] = currentObj[arrayKey] || {};
      }
    } else {
      currentObj = currentObj[key] = currentObj[key] || {};
    }
  });

  // Set the property at the specified key to the specified value
  currentObj[lastKey!] = value;
};
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormState: (state: any, action) => {
      const { name, value } = action.payload;

      setNestedValue(state, name, value);

      // Perform validation and update errors
      let error = null;
      if (name === 'country') error = validateCountry(value);
      if (name === 'online') error = validateOnlineSection(value);

      state.formErrorState[name] = error;
    }
    // ... other reducers
  }
});

export const { updateFormState } = formSlice.actions;
export default formSlice.reducer;
