import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  searchesData: false,
};

const SearchListSlice = createSlice({
  name: 'searchList',
  initialState,
  reducers: {
    searchList: (state, { payload }) => {
      state.searchesData = payload;
    },
  },
});

export const { searchList } = SearchListSlice.actions;
export default SearchListSlice.reducer;
