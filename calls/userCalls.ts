import { ERR_SOMETHING } from "./../modules/ErrorCode";
import { COOKIE_ACCESS_TOKEN } from "./../constants";
import { APP_URL } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { readCookie } from "../modules/CookieHandler";
import { User } from "../redux/slices/userSlice";
import { CallError } from "./Types";

export const callFetchUser = async (): Promise<{
  data: { user: User };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/user`,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw { code: "", message: error.response.data };
  }
};

export const callSignupWithEmail = async (
  email: string,
  password: string,
  userName: string
): Promise<{}> => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/signup-with-email`,
      data: { email, password, userName },
    });

    return {};
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callVerifyUser
export const callVerifyUser = async (
  verificationCode: string
): Promise<{
  data: { token: string };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/verify-user`,
      data: { verificationCode },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callVerifyUser
export const callLoginUser = async (
  email: string,
  password: string
): Promise<{
  data: { token: string };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/login-user`,
      data: { email, password },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
