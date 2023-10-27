import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  previousSearch: [],
};

const previousSearchSlice = createSlice({
  name: 'previousSearch',
  initialState,
  reducers: {
    modifyPreviousSearch: (state, { payload }) => {
      state.previousSearch = payload;
      return state;
    },
  },
});

export const { modifyPreviousSearch } = previousSearchSlice.actions;
export default previousSearchSlice.reducer;
