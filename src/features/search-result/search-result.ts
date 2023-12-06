import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  activeTab: ''
};

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    modifySearchResult: (state, { payload }) => {
      const { activeTab } = payload;
      state.activeTab = activeTab;
      return state;
    }
  }
});

export const { modifySearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
