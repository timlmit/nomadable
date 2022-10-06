import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { callGetSpeed } from "../../../calls/speedTestCalls";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiGetSpeedStatus: ApiStatus;
  speedDown: number;
  speedUp: number;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiGetSpeedStatus: initialApiState,
  speedDown: 0,
  speedUp: 0,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiGetSpeedState: (state) => {
      state.apiGetSpeedStatus.status = cons.API_IDLE;
      state.apiGetSpeedStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // GetSpeed
    builder.addCase(apiGetSpeed.pending, (state, action) => {
      state.apiGetSpeedStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiGetSpeed.fulfilled, (state, action) => {
      state.apiGetSpeedStatus.status = cons.API_SUCCEEDED;
      state.speedDown = action.payload.speedDown;
      state.speedUp = action.payload.speedUp;
    });
    builder.addCase(apiGetSpeed.rejected, (state, action) => {
      state.apiGetSpeedStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiGetSpeedStatus.error = action.payload.message;
      } else {
        state.apiGetSpeedStatus.error = action.error.message || "";
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

// GetSpeed

export const apiGetSpeed = createAsyncThunk<
  { speedDown: number; speedUp: number }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("speedTest/GetSpeed", async ({}, thunkApi) => {
  try {
    const { speedDown, speedUp } = await callGetSpeed();
    return { speedDown, speedUp };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Actions: call ajax & mutate store (only from here)
 */

export const { initApiGetSpeedState } = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiGetSpeedStatus = (state: RootState): ApiStatus =>
  state.apiSpeedTest.apiGetSpeedStatus;

export const selectSpeedResult = (
  state: RootState
): { speedDown: number; speedUp: number } => {
  return {
    speedDown: state.apiSpeedTest.speedDown,
    speedUp: state.apiSpeedTest.speedUp,
  };
};

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
