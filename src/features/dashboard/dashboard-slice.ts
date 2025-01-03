import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isResultPage: false,
  resultPageData: {
    foundKeywords: [],
    foundProducts: [],
    notFoundKeywords: []
  },
  columnData: []
};

const DashboardResultPageSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    dashboardResultPage: (state, { payload }) => {
      state.isResultPage = payload.isResultPage ?? state.isResultPage; // Preserve previous value if not provided
      state.resultPageData = payload.resultPageData ?? state.resultPageData; // Preserve previous value
      state.columnData = payload.columnData ?? state.columnData; // Preserve previous value
    }
  }
});

export const { dashboardResultPage } = DashboardResultPageSlice.actions;

export default DashboardResultPageSlice.reducer;
