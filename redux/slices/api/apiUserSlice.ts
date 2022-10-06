import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { User } from "../userSlice";
import {
  callFetchUser,
  callLoginUser,
  callSignupWithEmail,
  callVerifyUser,
} from "../../../calls/userCalls";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { saveTokenToCookie } from "../../../modules/AuthUtils";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchUserStatus: ApiStatus;
  apiSignupWithEmailStatus: ApiStatus;
  apiVerifyUserStatus: ApiStatus;
  apiLoginUserStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiFetchUserStatus: initialApiState,
  apiSignupWithEmailStatus: initialApiState,
  apiVerifyUserStatus: initialApiState,
  apiLoginUserStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    // Fetch User
    initApiFetchUserState: (state) => {
      state.apiFetchUserStatus.status = cons.API_IDLE;
      state.apiFetchUserStatus.error = "";
    },
    initLoginUserState: (state) => {
      state.apiLoginUserStatus.status = cons.API_IDLE;
      state.apiLoginUserStatus.error = "";
    },
    initApiSignupWithEmailState: (state) => {
      state.apiSignupWithEmailStatus.status = cons.API_IDLE;
      state.apiSignupWithEmailStatus.error = "";
    },
    initApiVerifyUserState: (state) => {
      state.apiVerifyUserStatus.status = cons.API_IDLE;
      state.apiVerifyUserStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // FetchUser
    builder.addCase(apiFetchUser.pending, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchUser.fulfilled, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchUser.rejected, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchUserStatus.error = action.payload.message;
      } else {
        state.apiFetchUserStatus.error = action.error.message || "";
      }
    });

    // SignupWithEmail
    builder.addCase(apiSignupWithEmail.pending, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiSignupWithEmail.fulfilled, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiSignupWithEmail.rejected, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiSignupWithEmailStatus.error = action.payload.message;
      } else {
        state.apiSignupWithEmailStatus.error = action.error.message || "";
      }
    });

    // VerifyUser
    builder.addCase(apiVerifyUser.pending, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiVerifyUser.fulfilled, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiVerifyUser.rejected, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiVerifyUserStatus.error = action.payload.message;
      } else {
        state.apiVerifyUserStatus.error = action.error.message || "";
      }
    });

    // LoginUser
    builder.addCase(apiLoginUser.pending, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiLoginUser.fulfilled, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiLoginUser.rejected, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiLoginUserStatus.error = action.payload.message;
      } else {
        state.apiLoginUserStatus.error = action.error.message || "";
      }
    });
  },
});

/**
 * Async Thunk
 */

const unknownError = {
  response: {
    data: ERR_SOMETHING,
  },
};

// FetchUser

export const apiFetchUser = createAsyncThunk<
  { user: User }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/FetchUser", async (_, thunkApi) => {
  try {
    const { data } = await callFetchUser();
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// SignupWithEmail

export const apiSignupWithEmail = createAsyncThunk<
  {}, // Return type of the payload creator
  { email: string; password: string; userName: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/SignupWithEmail", async ({ email, password, userName }, thunkApi) => {
  try {
    await callSignupWithEmail(email, password, userName);
    return;
  } catch (error: any) {
    window.alert(error.response.data);
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// VerifyUser

export const apiVerifyUser = createAsyncThunk<
  { token: string }, // Return type of the payload creator
  { verificationCode: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/VerifyUser", async ({ verificationCode }, thunkApi) => {
  try {
    const { data } = await callVerifyUser(verificationCode);

    saveTokenToCookie(data.token);

    setTimeout(() => {
      thunkApi.dispatch(apiFetchUser({}));
    }, 500);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// LoginUser

export const apiLoginUser = createAsyncThunk<
  { token: string }, // Return type of the payload creator
  { email: string; password: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/LoginUser", async ({ email, password }, thunkApi) => {
  try {
    const { data } = await callLoginUser(email, password);

    saveTokenToCookie(data.token);

    setTimeout(() => {
      thunkApi.dispatch(apiFetchUser({}));
    }, 500);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Actions: call ajax & mutate store (only from here)
 */

export const {
  initApiFetchUserState,
  initLoginUserState,
  initApiSignupWithEmailState,
  initApiVerifyUserState,
} = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiFetchUserStatus;

export const selectApiSignupWithEmailStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiSignupWithEmailStatus;

export const selectApiVerifyUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiVerifyUserStatus;

export const selectApiLoginUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiLoginUserStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;