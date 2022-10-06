import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import { apiCheckIn, apiFetchPlaceForPage } from "./api/apiPlaceSlice";

/**
 * Types
 */

export interface Spot {
  googlePlaceId: string;
  spotName: string;
  spotLat: number | null;
  spotLng: number | null;
  spotAddress: string;
}

export interface Place extends Spot {
  id: string;
  placeType: string;
  discoveredBy: string;
  thumbnail: string;
  images: string[];
  speedDown: number;
  speedUp: number;
  testCnt: number;
  availability: string[];
  created: Date | undefined;
}

export interface PlaceUserData {
  userName: string;
  userPicture: string;
  userDescription: string;
}

export interface PlaceWithData extends Place, PlaceUserData {
  // user
  recentCheckInCnt: number;
  checkedInByUser: boolean;
}

interface PlaceState {
  placeForPage: PlaceWithData;
}

/**
 * Reducer
 */

export const initialPlace: Place = {
  id: "",
  placeType: cons.PLACE_TYPE_CAFE,
  discoveredBy: "",
  thumbnail: "",
  images: [],
  speedDown: 0,
  speedUp: 0,
  testCnt: 0,
  availability: [],
  created: undefined,

  googlePlaceId: "",
  spotName: "",
  spotLat: null,
  spotLng: null,
  spotAddress: "",
};

export const initialPlaceWithData: PlaceWithData = {
  ...initialPlace,
  userName: "",
  userPicture: "",
  userDescription: "",

  recentCheckInCnt: 0,
  checkedInByUser: false,
};

const initialState: PlaceState = {
  placeForPage: initialPlaceWithData,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchPlaceForPage.fulfilled, (state, action) => {
      state.placeForPage = action.payload.placeWithData;
    });
    builder.addCase(apiCheckIn.fulfilled, (state, action) => {
      const { checkedInByUser, speedDown, speedUp, recentCheckInCnt } =
        action.payload.placeWithData;

      state.placeForPage.checkedInByUser = checkedInByUser;
      state.placeForPage.speedDown = speedDown;
      state.placeForPage.speedUp = speedUp;
      state.placeForPage.recentCheckInCnt = recentCheckInCnt;
    });
  },
});

export const {} = placeSlice.actions;

/**
 * Selectors
 */

export const selectPlaceForPage = (state: RootState): PlaceWithData =>
  state.place.placeForPage;

/**
 * Export actions & reducer
 */

export default placeSlice.reducer;
