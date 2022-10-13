import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { callDeleteReview, callPostReview } from "../../../calls/reviewCall";
import { Review, ReviewWithData } from "../placeSlice";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiPostReviewStatus: ApiStatus;
  apiDeleteReviewStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiPostReviewStatus: initialApiState,
  apiDeleteReviewStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiPostReviewState: (state) => {
      state.apiPostReviewStatus.status = cons.API_IDLE;
      state.apiPostReviewStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // PostReview
    builder.addCase(apiPostReview.pending, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiPostReview.fulfilled, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiPostReview.rejected, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiPostReviewStatus.error = action.payload.message;
      } else {
        state.apiPostReviewStatus.error = action.error.message || "";
      }
    });

    // DeleteReview
    builder.addCase(apiDeleteReview.pending, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiDeleteReview.fulfilled, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiDeleteReview.rejected, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiDeleteReviewStatus.error = action.payload.message;
      } else {
        state.apiDeleteReviewStatus.error = action.error.message || "";
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

// apiPostReview

export const apiPostReview = createAsyncThunk<
  {
    reviewWithData: ReviewWithData;
    placeId: string;
    reviewStars: number;
    isNew: boolean;
  }, // Return type of the payload creator
  { placeId: string; stars: number; comment: string; isNew: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/PostReview", async ({ placeId, stars, comment, isNew }, thunkApi) => {
  try {
    const { reviewWithData, reviewStars } = await callPostReview(
      placeId,
      stars,
      comment
    );
    return { reviewWithData, placeId, reviewStars, isNew };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiDeleteReview

export const apiDeleteReview = createAsyncThunk<
  {
    reviewStars: number;
    placeId: string;
    reviewId: string;
  }, // Return type of the payload creator
  { reviewId: string; placeId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/DeleteReview", async ({ reviewId, placeId }, thunkApi) => {
  try {
    const { reviewStars } = await callDeleteReview(reviewId, placeId);
    return { reviewStars, placeId, reviewId };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiPostReviewState } = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiPostReviewStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiPostReviewStatus;

export const selectApiDeleteReviewStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiDeleteReviewStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
