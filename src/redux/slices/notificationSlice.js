// src/redux/slices/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export const selectNotificationMessage = (state) => state.notification.message;
export const selectNotificationType = (state) => state.notification.type;

export default notificationSlice.reducer;
