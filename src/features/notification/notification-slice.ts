import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  status: false,
};

const NotificationSlice = createSlice({
  name: 'notifiactionBadge',
  initialState,
  reducers: {
    notificationBadge: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { notificationBadge } = NotificationSlice.actions;
export default NotificationSlice.reducer;
