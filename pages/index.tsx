import React, { Fragment, useEffect } from "react";
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
import { GetStaticProps } from "next";
import styled from "styled-components";
import { forMobile } from "../styles/Responsive";
import { FontSizeLarge } from "../styles/styled-components/FontSize";

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  const places = useAppSelector(selectPlaceSearchResult);

  return (
    <Fragment>
      <Layout width={"100%"} fixed>
        <HeadSetter
          pageTitle={`${APP_NAME}: ${APP_SHORT_DESCRIPTION}`}
          pageDescription={APP_LONG_DESCRIPTION}
          pagePath={APP_URL}
        />
        <TopPage places={places} />
      </Layout>
      {/* <ForMobile>
        Sorry, the mobile version is not ready yet. Please access via PC.
      </ForMobile> */}
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
  color : ${cons.FONT_COLOR_LIGHT};
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
