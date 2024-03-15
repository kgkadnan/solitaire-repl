import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  status: false,
  deleteStatus: false
};

const ProfileUpdateSlice = createSlice({
  name: 'profileUpdate',
  initialState,
  reducers: {
    profileUpdate: (state, { payload }) => {
      state.status = payload;
    },
    deleteProfileStore: (state, { payload }) => {
      state.deleteStatus = payload;
    }
  }
});

export const { profileUpdate, deleteProfileStore } = ProfileUpdateSlice.actions;
export default ProfileUpdateSlice.reducer;
