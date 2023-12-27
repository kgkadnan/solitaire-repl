import {
  validateCountry,
  validateOnlineSection
} from '@/app/my-account/kyc/helper/handle-validation';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formState: {
    country: '',
    online: { sections: [{}] },
    offline: null
  },
  formErrors: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormState: (state: any, action) => {
      const { name, value } = action.payload;
      state.formState[name] = state.formState[name]
        ? state.formState[name] + value
        : value;

      // Perform validation and update errors
      let error = null;
      if (name === 'country') error = validateCountry(value);
      if (name === 'online') error = validateOnlineSection(value);

      state.formErrors[name] = error;
    }
    // ... other reducers
  }
});

export const { updateFormState } = formSlice.actions;
export default formSlice.reducer;
