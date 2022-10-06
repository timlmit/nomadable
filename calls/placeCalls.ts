import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Place, PlaceWithData } from "../redux/slices/placeSlice";
import { readCookie } from "../modules/CookieHandler";

export const callCreatePlace = async (
  place: Place
): Promise<{ placeId: string }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/create-place`,
      data: { place },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
      placeId: error.response.data.placeId,
    };
  }
};

// callFetchPlace

export const callFetchPlace = async (
  placeId: string
): Promise<{ placeWithData: PlaceWithData }> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/place-with-data`,
      params: { placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// check In

export const callCheckIn = async (
  placeId: string,
  speedDown: number,
  speedUp: number
): Promise<{ placeWithData: PlaceWithData }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/check-in`,
      data: { speedDown, speedUp, placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};
