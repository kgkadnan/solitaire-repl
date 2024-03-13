import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  status: false
};

const ProfileUpdateSlice = createSlice({
  name: 'profileUpdate',
  initialState,
  reducers: {
    profileUpdate: (state, { payload }) => {
      state.status = payload;
    }
  }
});

export const { profileUpdate } = ProfileUpdateSlice.actions;
export default ProfileUpdateSlice.reducer;
