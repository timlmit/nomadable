import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import {
  FilterObj,
  MapArea,
  Place,
  PlaceWithData,
} from "../redux/slices/placeSlice";
import { readCookie } from "../modules/CookieHandler";

export const callCreatePlace = async (
  place: Place
): Promise<{ placeId: string; addingPoint: number; totalPoint: number }> => {
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
  placeId: string,
  forSSR?: boolean
): Promise<{ placeWithData: PlaceWithData }> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/place-with-data`,
      params: { placeId },
      headers: {
        Authorization: forSSR ? "" : readCookie(COOKIE_ACCESS_TOKEN) || "",
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
): Promise<{
  placeWithData: PlaceWithData;
  addingPoint: number;
  totalPoint: number;
}> => {
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

// fetch places

export const callFetchPlaces = async (params: {
  mapArea: MapArea;
  pageIndex: number;
  filterObj: FilterObj;
}): Promise<{ places: Place[] }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/places`,
      data: {
        latStart: params.mapArea.latStart,
        lngStart: params.mapArea.lngStart,
        latEnd: params.mapArea.latEnd,
        lngEnd: params.mapArea.lngEnd,
        pageIndex: params.pageIndex,
        filterObj: params.filterObj,
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

// fetch recent checkins

export const callRecentCheckIns = async (): Promise<{
  recentCheckIns: Place[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/recent-checkins`,
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

// callFetchAllPlaceIds

export const callFetchAllPlaceIds = async (): Promise<{
  placeIds: string[];
}> => {
  try {
    console.log("fetch");
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/all-place-ids`,
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};
