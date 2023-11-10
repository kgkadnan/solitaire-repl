import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {};

const savedSearchSlice = createSlice({
  name: 'savedSearch',
  initialState,
  reducers: {
    modifySavedSearch: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { modifySavedSearch } = savedSearchSlice.actions;
export default savedSearchSlice.reducer;
