import { createSlice } from '@reduxjs/toolkit';

const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState: {
    queryParams: {}
  },
  reducers: {
    queryParamsFunction: (state, action) => {
      state = action.payload;
      return state;
    }
  }
});

export const { queryParamsFunction } = queryParamsSlice.actions;
export default queryParamsSlice.reducer;
