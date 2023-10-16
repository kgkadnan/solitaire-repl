import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const comapreStoneSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default comapreStoneSlice.reducer;

//   export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//   } = usersAdapter.getSelectors((state) => state.users)
