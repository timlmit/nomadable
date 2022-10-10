import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";
import placeReducer from "./slices/placeSlice";
import newPlaceReducer from "./slices/newPlaceSlice";
import contributerReducer from "./slices/contributerSlice";
import eventReducer from "./slices/eventSlice";
import apiUserReducer from "./slices/api/apiUserSlice";
import apiSpotReducer from "./slices/api/apiSpotSlice";
import apiPlaceReducer from "./slices/api/apiPlaceSlice";
import apiEventReducer from "./slices/api/apiEventSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    place: placeReducer,
    newPlace: newPlaceReducer,
    contributer: contributerReducer,
    event: eventReducer,
    apiUser: apiUserReducer,
    apiSpot: apiSpotReducer,
    apiPlace: apiPlaceReducer,
    apiEvent: apiEventReducer,
    // apiSpeedTest: apiSpeedTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
