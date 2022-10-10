import { apiFetchContributersArea } from "./api/apiUserSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Types
 */

export interface Contributer {
  userId: string;
  name: string;
  picture: string;
  title: string;
  point: number;
}

interface ContributerState {
  contributersArea: Contributer[];
}

/**
 * Reducer
 */

const initialState: ContributerState = {
  contributersArea: [],
};

const contributerSlice = createSlice({
  name: "newPlace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchContributersArea.fulfilled, (state, action) => {
      state.contributersArea = action.payload.contributers;
    });
  },
});

export const {} = contributerSlice.actions;

/**
 * Selectors
 */

export const selectContributersArea = (state: RootState): Contributer[] =>
  state.contributer.contributersArea;

/**
 * Export actions & reducer
 */

export default contributerSlice.reducer;
