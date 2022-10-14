import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { readCookie } from "../modules/CookieHandler";
import { Event, EventWithData } from "../redux/slices/eventSlice";
import { Review, ReviewWithData } from "../redux/slices/placeSlice";

// check In

export const callPostReview = async (
  placeId: string,
  stars: number,
  comment: string
): Promise<{
  reviewWithData: ReviewWithData;
  reviewStars: number;
  addingPoint: number;
  totalPoint: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/post-review`,
      data: { placeId, stars, comment },
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

// Delete

export const callDeleteReview = async (
  reviewId: string,
  placeId: string
): Promise<{
  reviewStars: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/delete-review`,
      data: { reviewId, placeId },
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
