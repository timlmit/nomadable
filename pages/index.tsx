import React, { useEffect } from "react";
import * as cons from "../constants";

import {
  APP_LONG_DESCRIPTION,
  APP_NAME,
  APP_SHORT_DESCRIPTION,
  APP_URL,
  CONTAINER_WIDTH_WIDE,
} from "../constants";
import { TopPage } from "../components/top-page/TopPage";
import { Layout } from "../components/commons/Layout";
import HeadSetter from "../components/commons/HeadSetter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectPlaceSearchResult } from "../redux/slices/placeSlice";
import {
  apiFetchPlaces,
  selectApiFetchPlacesStatus,
} from "../redux/slices/api/apiPlaceSlice";

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectPlaceSearchResult);
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);

  return (
    <Layout width={CONTAINER_WIDTH_WIDE}>
      <HeadSetter
        pageTitle={`${APP_NAME} | ${APP_SHORT_DESCRIPTION}`}
        pageDescription={APP_LONG_DESCRIPTION}
        pagePath={APP_URL}
      />
      <TopPage places={places} />
    </Layout>
  );
}
