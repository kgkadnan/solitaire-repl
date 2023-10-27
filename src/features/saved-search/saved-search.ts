import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  savedSearch: [],
  activeTab: 0,
};

const savedSearchSlice = createSlice({
  name: 'savedSearch',
  initialState,
  reducers: {
    modifySavedSearch: (state, { payload }) => {
      let { modifyData, activeTab } = payload;
      state.savedSearch = modifyData;
      state.activeTab = activeTab;
      return state;
    },
  },
});

export const { modifySavedSearch } = savedSearchSlice.actions;
export default savedSearchSlice.reducer;
