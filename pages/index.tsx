import React from "react";

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

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  return (
    <Layout width={CONTAINER_WIDTH_WIDE}>
      <HeadSetter
        pageTitle={`${APP_NAME} | ${APP_SHORT_DESCRIPTION}`}
        pageDescription={APP_LONG_DESCRIPTION}
        pagePath={APP_URL}
      />
      <TopPage />
    </Layout>
  );
}
