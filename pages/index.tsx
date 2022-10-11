import React, { useEffect } from "react";
import * as cons from "../constants";

import {
  APP_LONG_DESCRIPTION,
  APP_NAME,
  APP_SHORT_DESCRIPTION,
  APP_URL,
} from "../constants";
import { TopPage } from "../components/top-page/TopPage";
import { Layout } from "../components/commons/Layout";
import HeadSetter from "../components/commons/HeadSetter";
import { useAppSelector } from "../redux/hooks";
import { selectPlaceSearchResult } from "../redux/slices/placeSlice";

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  const places = useAppSelector(selectPlaceSearchResult);

  return (
    <Layout width={"100%"} fixed>
      <HeadSetter
        pageTitle={`${APP_NAME}: ${APP_SHORT_DESCRIPTION}`}
        pageDescription={APP_LONG_DESCRIPTION}
        pagePath={APP_URL}
      />
      <TopPage places={places} />
    </Layout>
  );
}
