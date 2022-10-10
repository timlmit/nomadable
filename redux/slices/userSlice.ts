import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import {
  apiFetchMyAccountWithStats,
  apiFetchUser,
  apiFetchUserWithStats,
  apiUpdateUser,
} from "./api/apiUserSlice";

/**
 * Types
 */

export interface EditableUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  title: string;
  description: string;
  link: string;
}

export interface User extends EditableUser {
  _id: string;
  password: string;
  salt: string;
  subscriber: string;
  verified: boolean;
  deletedDate: Date | null;
  created: Date | undefined;
}

export interface UserWithStats {
  _id: string;
  id: string;
  email: string;
  name: string;
  picture: string;
  title: string;
  description: string;
  link: string;
  created: Date | undefined;
  // outer data
  points: number;
  ranking: number;
  discovered: number;
  checkIns: number;
}

interface UserState {
  user: User;
  userWithStatsMine: UserWithStats;
  userWithStats: UserWithStats;
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
  title: "",
  description: "",
  link: "",
  password: "",
  salt: "",
  subscriber: "",
  verified: false,
  deletedDate: null,
  created: undefined,
};

export const initialUserWithStats: UserWithStats = {
  _id: "",
  id: "",
  email: "",
  name: "",
  picture: "",
  title: "",
  description: "",
  link: "",
  created: undefined,
  // outer data
  points: 0,
  ranking: 0,
  discovered: 0,
  checkIns: 0,
};

const initialState: UserState = {
  user: initialUser,
  userWithStatsMine: initialUserWithStats,
  userWithStats: initialUserWithStats,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Fetch User
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    initUserWithStats: (state) => {
      state.userWithStats = initialUserWithStats;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(apiFetchMyAccountWithStats.fulfilled, (state, action) => {
      state.userWithStatsMine = action.payload.userWithStats;
    });
    builder.addCase(apiFetchUserWithStats.fulfilled, (state, action) => {
      state.userWithStats = action.payload.userWithStats;
    });
    builder.addCase(apiUpdateUser.fulfilled, (state, action) => {
      state.userWithStatsMine = {
        ...state.userWithStatsMine,
        ...action.payload.editableUser,
      };
    });
  },
});

export const { updateUser, initUserWithStats } = userSlice.actions;

/**
 * Selectors
 */

export const selectUser = (state: RootState): User => state.user.user;

export const selectAuthenticated = (state: RootState): boolean =>
  state.user.user._id !== "";

export const selectMyAccountWithStats = (state: RootState): UserWithStats =>
  state.user.userWithStatsMine;

export const selectUserWithStats = (state: RootState): UserWithStats =>
  state.user.userWithStats;

/**
 * Export actions & reducer
 */

export default userSlice.reducer;
