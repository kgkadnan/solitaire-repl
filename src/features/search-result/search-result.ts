import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  activeTab: ''
};

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    modifySearchResult: (state, { payload }) => {
      let { activeTab } = payload;
      state.activeTab = activeTab;
      return state;
    }
  }
});

export const { modifySearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
