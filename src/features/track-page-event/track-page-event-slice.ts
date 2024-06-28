import { createSlice } from '@reduxjs/toolkit';

const pageTimeTrackingSlice = createSlice({
  name: 'pageTimeTracking',
  initialState: {
    startTime: null,
    endTime: null,
    isSuccess: null
  },
  reducers: {
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    resetTimeTracking: state => {
      state.startTime = null;
      state.endTime = null;
      state.isSuccess = null;
    }
  }
});

export const { setStartTime, setEndTime, setIsSuccess, resetTimeTracking } =
  pageTimeTrackingSlice.actions;
export default pageTimeTrackingSlice.reducer;
