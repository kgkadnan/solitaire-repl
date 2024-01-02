import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  status: false
};

const isEditingKycSlice = createSlice({
  name: 'isEditingKYC',
  initialState,
  reducers: {
    isEditingKYC: (state, { payload }) => {
      state.status = payload;
    }
  }
});

export const { isEditingKYC } = isEditingKycSlice.actions;
export default isEditingKycSlice.reducer;
