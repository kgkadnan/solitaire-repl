// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false
};

const LogoutSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: state => {
      state.showModal = true;
    },
    hide: state => {
      state.showModal = false;
    }
  }
});

export const { show, hide } = LogoutSlice.actions;

export default LogoutSlice.reducer;
