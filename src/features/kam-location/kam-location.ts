import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: ''
};

const KamLocationSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    kamLocationAction: (state, { payload }) => {
      state.location = payload;
    }
  }
});

export const { kamLocationAction } = KamLocationSlice.actions;

export default KamLocationSlice.reducer;
