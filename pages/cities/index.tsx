import { GetStaticProps } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { callFetchCitiesWithData } from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import { CitiesSection } from "../../components/cities/CitiesSection";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import {
  APP_NAME,
  APP_URL,
  CONTAINER_WIDTH_NARROW,
  CONTAINER_WIDTH_SO_NARROW,
} from "../../constants";

import {
  CITIES,
  City,
  CityMetaData,
  CityWithData,
} from "../../data/articles/cities";
import citiesWithData from "../api/cities-with-data";

interface Props {
  citiesWithData: CityWithData[];
}

const BREADCRUMBS = [{ text: "Cities", url: "/cities" }];

const Cities: React.FC<Props> = (props) => {
  const [_citiesWithData, setCitiesWithData] = useState<CityWithData[]>(
    props.citiesWithData || []
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
    const { citiesWithData } = await callFetchCitiesWithData(CITIES);
    setCitiesWithData(citiesWithData);
  };

  useEffect(() => {
    fetchData();
  }, [null]);

  return (
    <Layout width={CONTAINER_WIDTH_NARROW} fixed>
      <HeadSetter
        pageTitle={`List of Cities for Remote Workers | ${APP_NAME}`}
        pageDescription={generatePageDescription()}
        pagePath={`${APP_URL}/cities`}
      />
      <Breadcrumb breadcrumbs={BREADCRUMBS} />
      <CitiesSection citiesWithData={_citiesWithData} />
    </Layout>
  );
};

export default Cities;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.placeId !== "string") throw Error;

    const { citiesWithData } = await callFetchCitiesWithData(CITIES);

    return {
      props: {
        citiesWithData,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        citiesWithData: [],
      },
    };
  }
};
