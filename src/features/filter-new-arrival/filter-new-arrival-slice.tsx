import { createSlice } from '@reduxjs/toolkit';

const filterNewArrivalSlice = createSlice({
  name: 'pageTimeTracking',
  initialState: {
    bidData: [],
    bidFilterData: [],
    bidCount: 0,
    queryParams: ''
  },
  reducers: {
    filterFunction: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});

export const { filterFunction } = filterNewArrivalSlice.actions;
export default filterNewArrivalSlice.reducer;
