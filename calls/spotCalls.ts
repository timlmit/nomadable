import axios, { AxiosError, AxiosResponse } from "axios";

import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import { readCookie } from "../modules/CookieHandler";
import { SpotPrediction } from "../redux/slices/api/apiSpotSlice";
import { Spot } from "../redux/slices/placeSlice";

export const callFetchSpotsByText = async (
  text: string
): Promise<{
  data: { spotPredictions: SpotPrediction[] };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/spots-by-text`,
      params: { text },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callFetchPlaceInfo

export const callFetchSpotInfo = async (
  placeId: string
): Promise<{
  data: { spot: Spot };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/spot-detail`,
      params: { placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
