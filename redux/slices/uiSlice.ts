import { NOTIFICATION_SUCCEED } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";

/**
 * Types
 */

interface NotificationState {
  timestamp: number;
  type: string;
  message: string;
  seconds: number;
}

interface UiState {
  notification: NotificationState;
  visibleModal: string;
}

/**
 * Reducer
 */

const initialNotification: NotificationState = {
  timestamp: 0,
  type: cons.NOTIFICATION_SUCCEED,
  message: "",
  seconds: 0,
};

const initialState: UiState = {
  notification: initialNotification,
  visibleModal: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Show Notification
    showNotification: (
      state,
      action: PayloadAction<{ type: string; message: string; seconds: number }>
    ) => {
      state.notification.timestamp = Date.now();
      state.notification.type = action.payload.type;
      state.notification.message = action.payload.message;
      state.notification.seconds = action.payload.seconds;
    },
    // Update Visible Modal
    updateVisibleModal: (state, action: PayloadAction<{ id: string }>) => {
      state.visibleModal = action.payload.id;
    },
  },
});

export const { showNotification, updateVisibleModal } = uiSlice.actions;

/**
 * Selectors
 */

export const selectNotificationState = (state: RootState): NotificationState =>
  state.ui.notification;

export const selectVisibleModal = (state: RootState): string =>
  state.ui.visibleModal;

/**
 * Export actions & reducer
 */

export default uiSlice.reducer;
