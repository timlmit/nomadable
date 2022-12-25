import { GetStaticProps } from "next";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { callFetchCitiesWithData } from "../calls/placeCalls";
import { CitiesSection } from "../components/cities/CitiesSection";
import HeadSetter from "../components/commons/HeadSetter";
import { Layout } from "../components/commons/Layout";
import { Contributers } from "../components/top-page/search-result/Contributers";
import {
  CONTAINER_WIDTH_NARROW,
  APP_NAME,
  APP_URL,
  APP_SHORT_DESCRIPTION,
  CONTAINER_WIDTH_WIDE,
  FONT_COLOR_LIGHT,
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_SUPER_LIGHT,
} from "../constants";
import { CityWithData, CITIES } from "../data/articles/cities";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { apiFetchContributersArea } from "../redux/slices/api/apiUserSlice";
import { selectContributersArea } from "../redux/slices/contributerSlice";
import { forMobile } from "../styles/Responsive";

interface Props {
  citiesWithData: CityWithData[];
  totalPlaceCnt: number;
}

const Cities: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const contributers = useAppSelector(selectContributersArea);
  const [_citiesWithData, setCitiesWithData] = useState<CityWithData[]>(
    props.citiesWithData || []
  );
  const [totalPlaceCnt, setTotalPlaceCnt] = useState<number>(
    props.totalPlaceCnt
  );

  const generatePageDescription = () => {
    return `
      Find best places to work from wherever you are: 
      ${_citiesWithData
        .map((city, index) => ` ${index + 1}. ${city.city}`)
        .join(" · ")}.
    `;
  };

  const fetchData = async () => {
    const { citiesWithData, totalPlaceCnt } = await callFetchCitiesWithData(
      CITIES
    );
    setCitiesWithData(citiesWithData);
    // const _totalPlaceCnt = citiesWithData.reduce(
    //   (acc, city) => acc + city.spotCnt,
    //   0
    // );
    setTotalPlaceCnt(totalPlaceCnt);
  };

  const fetchContributers = () => {
    dispatch(apiFetchContributersArea({ placeIds: null, maxCnt: 10 }));
  };

  useEffect(() => {
    fetchData();
    fetchContributers();
  }, [null]);

  return (
    <Layout width={CONTAINER_WIDTH_WIDE} fixed>
      <HeadSetter
        pageTitle={`${APP_NAME}: ${APP_SHORT_DESCRIPTION}`}
        pageDescription={generatePageDescription()}
        pagePath={`${APP_URL}`}
      />
      {/* <Breadcrumb breadcrumbs={BREADCRUMBS} /> */}
      <PageWrapper>
        <LeftWrapper>
          <CitiesSection
            citiesWithData={_citiesWithData}
            totalPlaceCnt={totalPlaceCnt}
          />
        </LeftWrapper>
        <RightWrapper>
          <Contributers contributers={contributers} />
        </RightWrapper>
      </PageWrapper>
    </Layout>
  );
};

export default Cities;

export const getStaticProps: GetStaticProps = async ({}) => {
  try {
    const { citiesWithData, totalPlaceCnt } = await callFetchCitiesWithData(
      CITIES
    );
    // const totalPlaceCnt = citiesWithData
    //   .filter((c) => c.boundary !== null)
    //   .reduce((total, city) => total + city.spotCnt, 0);

    return {
      props: {
        citiesWithData,
        totalPlaceCnt,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        citiesWithData: [],
        totalPlaceCnt: 0,
      },
    };
  }
};

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  ${forMobile(`
    flex-direction: column;
    gap:0;
  `)}
`;

const LeftWrapper = styled.div``;

const RightWrapper = styled.div`
  width: 50rem;
  padding-top: 10rem;
  max-width: 100%;

  ${forMobile(`
    padding-top: 0rem;
    margin-top: -13rem;
    border-top: 1px solid ${FONT_COLOR_SUPER_LIGHT};
    margin-top: 1rem;
  `)}
`;
