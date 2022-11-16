import { AppProps } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import React, { useEffect } from "react";

import { store } from "../redux/store";
import GlobalStyles from "../styles/GlobalStyles";
import { GlobalHead } from "../components/global/GlobalHead";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { API_IDLE } from "../constants";
import { GlobalModals } from "../components/global/GlobalModals";
import {
  apiFetchUser,
  selectApiFetchUserStatus,
} from "../redux/slices/api/apiUserSlice";
import { Notification } from "../components/global/Notification";
import Script from "next/script";
import { GoogleTagManager } from "../components/global/GoogleTagManager";
// import { doFetchUser } from "../redux/actions/userAction";

const App = ({ Component, pageProps }: AppProps) => {
  const apiFetchUserStatus = useAppSelector(selectApiFetchUserStatus);
  const dispatch = useAppDispatch();

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            // Registration was successful
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          (err) => {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, [null]);

  useEffect(() => {
    if (apiFetchUserStatus.status === API_IDLE) {
      // doFetchUser(dispatch);
      dispatch(apiFetchUser({}));
    }
  }, [apiFetchUserStatus.status]);

  return (
    <Provider store={store}>
      <Head>
        <GlobalHead />
      </Head>
      {/* Google tag (gtag.js) */}
      <GoogleTagManager />
      <GlobalStyles />
      <Notification />
      <Component {...pageProps} />
      <GlobalModals />
    </Provider>
  );
};

const makeStore = () => store;

export default withRedux(makeStore)(App);
