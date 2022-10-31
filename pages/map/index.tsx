import React, { Fragment, useEffect } from "react";
import { GetStaticProps } from "next";
import styled from "styled-components";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { SplashPage } from "../../components/commons/SplashPage";
import { TopPage } from "../../components/top-page/TopPage";
import {
  APP_NAME,
  APP_SHORT_DESCRIPTION,
  APP_LONG_DESCRIPTION,
  APP_URL,
  FONT_COLOR_LIGHT,
  API_IDLE,
  PATH_MAP,
  API_LOADING,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  initApiFetchPlacesState,
  selectApiFetchPlacesStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  selectPlaceSearchResult,
  selectSearchResultTotalCnt,
} from "../../redux/slices/placeSlice";
import { forMobile } from "../../styles/Responsive";
import { FontSizeLarge } from "../../styles/styled-components/FontSize";

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectPlaceSearchResult);
  const searchResultTotalCnt = useAppSelector(selectSearchResultTotalCnt);
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);

  useEffect(() => {
    return () => {
      dispatch(initApiFetchPlacesState());
    };
  }, [null]);

  return (
    <Fragment>
      <SplashPage
        visible={apiStatus.status === API_IDLE}
        message="Loading map..."
      />
      <Layout width={"100%"} fixed>
        <HeadSetter
          pageTitle={`WiFi Map | ${APP_NAME}`}
          pageDescription={APP_LONG_DESCRIPTION}
          pagePath={`${APP_URL}${PATH_MAP}`}
        />
        <TopPage places={places} searchResultTotalCnt={searchResultTotalCnt} />
      </Layout>
    </Fragment>
  );
}

const ForMobile = styled.div`
  display: none;

  ${forMobile(`
  background-color: white;
  padding: 2rem;
  box-sizing: border-box;
  ${FontSizeLarge};
  color : ${FONT_COLOR_LIGHT};
  line-height: 1.5em;


  display: flex;
  justify-contents: center;
  align-items: center;
  text-align:center;

  position: fixed;;
  top: 0;
  left:0;
  height: 100%;
  width: 100vw;
  z-index: 100;
`)}
`;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     if (!params || typeof params.postId !== "string") throw Error;

//     return {
//       props: {
//         places: [],
//       },
//       revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
//     };
//   } catch (err: any) {
//     return {
//       props: {
//         places: [],
//       },
//     };
//   }
// };
