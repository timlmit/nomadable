import { STATUS_OPEN } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import {
  apiCheckIn,
  apiFetchPlaceForPage,
  apiFetchPlaces,
  apiSavePlace,
  // apiFetchRecentCheckIns,
  apiVoteAvailability,
} from "./api/apiPlaceSlice";
import {
  apiDeleteReview,
  apiPostReview,
  apiVoteReview,
} from "./api/apiReviewSlice";

/**
 * Types
 */

export interface SitemapLink {
  url: string;
  text: string;
}

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
  reviewStars: number;
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
  // reviews
  reviewsWithData: ReviewWithData[];
  // saved
  savedByUser: boolean;
}

export interface MapArea {
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
}

export interface FilterObj {
  placeTypes: string[];
  availability: string[];
  saved: boolean;
}

export interface Review {
  _id?: string;
  placeId: string;
  userId: string;
  stars: number;
  comment: string;
  voteScore: number;
  upVoters: string[];
  downVoters: string[];
  created: string;
}

export interface ReviewWithData extends Review {
  userPicture: string;
  userName: string;
  myReview: boolean;
}

export interface ReviewWithPlaceData extends Review {
  placeType: string;
  spotName: string;
  spotAddress: string;
  thumbnail: string;
}

export interface Vote {
  placeType: string;
  availability: string[];
}

export interface Availability {
  userId: string;
  placeId: string;
  vote: Vote;
}

interface PlaceState {
  totalPlaceCnt: number;
  searchResult: Place[];
  searchResultTotalCnt: number;
  recentCheckIns: Place[];
  placeForPage: PlaceWithData;
}

/**
 * Reducer
 */

export const initialFilterObj: FilterObj = {
  placeTypes: [],
  availability: [],
  saved: false,
};

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
  reviewStars: 0,
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
  reviewsWithData: [],
  savedByUser: false,
};

const initialState: PlaceState = {
  totalPlaceCnt: 0,
  searchResult: [],
  searchResultTotalCnt: 0,
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
      state.searchResultTotalCnt = action.payload.totalPlaceCnt;
    });
    // builder.addCase(apiFetchRecentCheckIns.fulfilled, (state, action) => {
    //   state.recentCheckIns = action.payload.recentCheckIns;
    // });
    builder.addCase(apiPostReview.fulfilled, (state, action) => {
      state.placeForPage.reviewStars = action.payload.reviewStars;
      if (action.payload.isNew) {
        state.placeForPage.reviewsWithData.unshift(
          action.payload.reviewWithData
        );
      } else {
        state.placeForPage.reviewsWithData =
          state.placeForPage.reviewsWithData.map((review) => {
            if (!review.myReview) return review;
            return action.payload.reviewWithData;
          });
      }
    });
    builder.addCase(apiDeleteReview.fulfilled, (state, action) => {
      if (state.placeForPage.id === action.payload.placeId) {
        state.placeForPage.reviewStars = action.payload.reviewStars;
        state.placeForPage.reviewsWithData =
          state.placeForPage.reviewsWithData.filter(
            (r) => r._id !== action.payload.reviewId
          );
      }
    });
    builder.addCase(apiVoteAvailability.fulfilled, (state, action) => {
      if (state.placeForPage.id === action.payload.placeId) {
        state.placeForPage.placeType = action.payload.placeType;
        state.placeForPage.availability = action.payload.availability;
      }
    });

    builder.addCase(apiVoteReview.pending, (state, action) => {
      state.placeForPage.reviewsWithData =
        state.placeForPage.reviewsWithData.map((review) => {
          if (review._id !== action.meta.arg.reviewId) return review;

          review.upVoters = review.upVoters.filter(
            (voter) => voter !== action.meta.arg.userId
          );
          review.downVoters = review.downVoters.filter(
            (voter) => voter !== action.meta.arg.userId
          );

          if (!action.meta.arg.clearVote) {
            if (action.meta.arg.isUpvote) {
              review.upVoters.push(action.meta.arg.userId);
            } else {
              review.downVoters.push(action.meta.arg.userId);
            }
          }

          return review;
        });
    });

    builder.addCase(apiVoteReview.fulfilled, (state, action) => {
      state.placeForPage.reviewsWithData =
        state.placeForPage.reviewsWithData.map((review) => {
          if (review._id !== action.payload.reviewWithData._id) return review;
          return action.payload.reviewWithData;
        });
    });
    builder.addCase(apiSavePlace.pending, (state, action) => {
      state.placeForPage.savedByUser = action.meta.arg.saved;
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

export const selectSearchResultTotalCnt = (state: RootState): number =>
  state.place.searchResultTotalCnt;

/**
 * Export actions & reducer
 */

export default placeSlice.reducer;
