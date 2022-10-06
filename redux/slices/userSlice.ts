import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import { apiFetchUser } from "./api/apiUserSlice";

/**
 * Types
 */

export interface User {
  _id: string;
  id: string;
  email: string;
  name: string;
  picture: string;
  description: string;
  link: string;
  password: string;
  salt: string;
  subscriber: string;
  verified: boolean;
  deletedDate: Date | null;
  created: Date | undefined;
}

interface UserState {
  user: User;
}

/**
 * Reducer
 */

export const initialUser: User = {
  _id: "",
  id: "",
  email: "",
  name: "test user",
  picture: "",
  description: "",
  link: "",
  password: "",
  salt: "",
  subscriber: "",
  verified: false,
  deletedDate: null,
  created: undefined,
};

const initialState: UserState = {
  user: initialUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Fetch User
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { updateUser } = userSlice.actions;

/**
 * Selectors
 */

export const selectUser = (state: RootState): User => state.user.user;

export const selectAuthenticated = (state: RootState): boolean =>
  state.user.user._id !== "";

/**
 * Export actions & reducer
 */

export default userSlice.reducer;
