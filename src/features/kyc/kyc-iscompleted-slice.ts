import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  status: false
};

const kycIsCompletedSlice = createSlice({
  name: 'kycIsCompleted',
  initialState,
  reducers: {
    kycIsCompleted: (state, { payload }) => {
      state.status = payload;
    }
  }
});

export const { kycIsCompleted } = kycIsCompletedSlice.actions;
export default kycIsCompletedSlice.reducer;
