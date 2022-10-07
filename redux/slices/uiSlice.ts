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
  pointEarned: {
    updated: number;
    addingPoint: number;
    totalPoint: number;
  };
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
  pointEarned: {
    updated: 0,
    addingPoint: 0,
    totalPoint: 0,
  },
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
    showPointEarned: (
      state,
      action: PayloadAction<{
        addingPoint: number;
        totalPoint: number;
      }>
    ) => {
      state.pointEarned.updated = Date.now();
      state.pointEarned.addingPoint = action.payload.addingPoint;
      state.pointEarned.totalPoint = action.payload.totalPoint;
    },
  },
});

export const { showNotification, updateVisibleModal, showPointEarned } =
  uiSlice.actions;

/**
 * Selectors
 */

export const selectNotificationState = (state: RootState): NotificationState =>
  state.ui.notification;

export const selectVisibleModal = (state: RootState): string =>
  state.ui.visibleModal;

export const selectPointEarned = (
  state: RootState
): { updated: number; addingPoint: number; totalPoint: number } =>
  state.ui.pointEarned;

/**
 * Export actions & reducer
 */

export default uiSlice.reducer;
