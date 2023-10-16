import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const comapreStoneAdaper = createEntityAdapter();
console.log('comapreStoneAdaper', comapreStoneAdaper);
const initialState: any = [];

const comapreStoneSlice = createSlice({
  name: 'compareStone',
  initialState,
  reducers: {
    addComapreStone: (state, { payload }) => {
      // Merge the new stones into the existing state
      state.push(payload);
    },
  },
});

export const { addComapreStone } = comapreStoneSlice.actions;
export default comapreStoneSlice.reducer;
