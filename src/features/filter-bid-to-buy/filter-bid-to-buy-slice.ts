import { createSlice } from '@reduxjs/toolkit';

const filterBidToBuySlice = createSlice({
  name: 'pageTimeTracking',
  initialState: {
    bidData: [],
    bidFilterData: [],
    bidCount: 0,
    queryParams: ''
  },
  reducers: {
    filterBidToBuyFunction: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});

export const { filterBidToBuyFunction } = filterBidToBuySlice.actions;
export default filterBidToBuySlice.reducer;
