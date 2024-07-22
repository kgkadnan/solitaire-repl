import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  confirmStoneTrack: ''
};

const ConfirmStoneTrackSlice = createSlice({
  name: 'ConfirmStoneTrack',
  initialState,
  reducers: {
    setConfirmStoneTrack: (state, { payload }) => {
      state.confirmStoneTrack = payload;
    }
  }
});

export const { setConfirmStoneTrack } = ConfirmStoneTrackSlice.actions;
export default ConfirmStoneTrackSlice.reducer;
