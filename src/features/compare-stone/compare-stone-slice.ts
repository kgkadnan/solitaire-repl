import { createSlice } from '@reduxjs/toolkit';

const initialState: any = [];

const comapreStoneSlice = createSlice({
  name: 'compareStone',
  initialState,
  reducers: {
    addCompareStone: (state, { payload }) => {
      // Merge the new stones into the existing state
      return [payload];
    },
  },
});

export const { addCompareStone } = comapreStoneSlice.actions;
export default comapreStoneSlice.reducer;
