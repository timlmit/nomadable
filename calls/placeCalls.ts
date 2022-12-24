import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import {
  FilterObj,
  MapArea,
  Place,
  PlaceWithData,
  SitemapLink,
  Vote,
} from "../redux/slices/placeSlice";
import { readCookie } from "../modules/CookieHandler";
import { City, CityWithData } from "../data/articles/cities";
import { Article, ArticleWithData } from "../data/articles/articles";

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

export const callDeletePlace = async (placeId: string) => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/delete-place`,
      data: { placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return;
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

export const callCheckIn = async (data: {
  placeId: string;
  speedDown: number;
  speedUp: number;
  isPublic: boolean;
}): Promise<{
  placeWithData: PlaceWithData;
  addingPoint: number;
  totalPoint: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/check-in`,
      data,
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
}): Promise<{ places: Place[]; totalPlaceCnt: number }> => {
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

// callFetchAllPlaceIds

export const callFetchDiscoveredPlaces = async (
  userId: string,
  loadedCnt: number,
  loadingCnt: number
): Promise<{
  places: Place[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/discovered-places`,
      params: { userId, loadedCnt, loadingCnt },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callVoteAvailability

export const callVoteAvailability = async (params: {
  placeId: string;
  vote: Vote;
}): Promise<{
  placeId: string;
  placeType: string;
  availability: string[];
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/vote-availability`,
      data: params,
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

//

export const callFetchCitiesWithData = async (
  params: City[]
): Promise<{ citiesWithData: CityWithData[]; totalPlaceCnt: number }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/cities-with-data`,
      data: { cities: params },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callFetchArticlesWithData

export const callFetchArticlesWithData = async (
  params: Article[]
): Promise<{ articlesWithData: ArticleWithData[] }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/articles-with-data`,
      data: { articles: params },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callUpdateImages

export const callUpdateImages = async (params: { placeId: string }) => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/update-images`,
      data: params,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// fetch places links

export const callFetchPlaceLinks = async (): Promise<{
  placeLinks: SitemapLink[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/sitemap-links`,
    });

    return response.data;
  } catch (error: any) {
    return { placeLinks: [] };
  }
};
