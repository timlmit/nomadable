import { STATUS_OPEN } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import {
  apiCheckIn,
  apiFetchPlaceForPage,
  apiFetchPlaces,
  apiFetchRecentCheckIns,
} from "./api/apiPlaceSlice";

/**
 * Types
 */

export interface Spot {
  googlePlaceId: string;
  spotName: string;
  spotLat: number;
  spotLng: number;
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
  status: string;
  created: Date | undefined;
}

export interface PlaceUserData {
  userName: string;
  userPicture: string;
  userDescription: string;
  userTitle: string;
}

export interface PlaceWithData extends Place, PlaceUserData {
  // user
  recentCheckInCnt: number;
  checkedInByUser: boolean;
}

export interface MapArea {
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
}

interface PlaceState {
  searchResult: Place[];
  recentCheckIns: Place[];
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
  status: STATUS_OPEN,
  created: undefined,

  googlePlaceId: "",
  spotName: "",
  spotLat: 0,
  spotLng: 0,
  spotAddress: "",
};

export const initialPlaceWithData: PlaceWithData = {
  ...initialPlace,
  userName: "",
  userPicture: "",
  userDescription: "",
  userTitle: "",

  recentCheckInCnt: 0,
  checkedInByUser: false,
};

const initialState: PlaceState = {
  searchResult: [],
  recentCheckIns: [],
  placeForPage: initialPlaceWithData,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    initPlaceForPage: (state) => {
      state.placeForPage = initialPlaceWithData;
    },
  },
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
    builder.addCase(apiFetchPlaces.fulfilled, (state, action) => {
      state.searchResult = action.payload.places;
    });
    builder.addCase(apiFetchRecentCheckIns.fulfilled, (state, action) => {
      state.recentCheckIns = action.payload.recentCheckIns;
    });
  },
});

export const { initPlaceForPage } = placeSlice.actions;

/**
 * Selectors
 */

export const selectPlaceForPage = (state: RootState): PlaceWithData =>
  state.place.placeForPage;

export const selectPlaceSearchResult = (state: RootState): Place[] =>
  state.place.searchResult;

export const selectRecentCheckIns = (state: RootState): Place[] =>
  state.place.recentCheckIns;

/**
 * Export actions & reducer
 */

export default placeSlice.reducer;
