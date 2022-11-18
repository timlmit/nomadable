import { GetStaticProps } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { callFetchCitiesWithData } from "../calls/placeCalls";
import { Breadcrumb } from "../components/app-commons/Breadcrumb";
import { CitiesSection } from "../components/cities/CitiesSection";
import HeadSetter from "../components/commons/HeadSetter";
import { Layout } from "../components/commons/Layout";
import {
  CONTAINER_WIDTH_NARROW,
  APP_NAME,
  APP_URL,
  APP_SHORT_DESCRIPTION,
} from "../constants";
import { CityWithData, CITIES } from "../data/articles/cities";

interface Props {
  citiesWithData: CityWithData[];
  totalPlaceCnt: number;
}

const Cities: React.FC<Props> = (props) => {
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
    const { citiesWithData } = await callFetchCitiesWithData(CITIES);
    setCitiesWithData(citiesWithData);
    const _totalPlaceCnt = citiesWithData.reduce(
      (acc, city) => acc + city.spotCnt,
      0
    );
    setTotalPlaceCnt(_totalPlaceCnt);
  };

  useEffect(() => {
    fetchData();
  }, [null]);

  return (
    <Layout width={CONTAINER_WIDTH_NARROW} fixed>
      <HeadSetter
        pageTitle={`${APP_NAME}: ${APP_SHORT_DESCRIPTION}`}
        pageDescription={generatePageDescription()}
        pagePath={`${APP_URL}`}
      />
      {/* <Breadcrumb breadcrumbs={BREADCRUMBS} /> */}
      <CitiesSection
        citiesWithData={_citiesWithData}
        totalPlaceCnt={totalPlaceCnt}
      />
    </Layout>
  );
};

export default Cities;

// export const getStaticProps: GetStaticProps = async ({}) => {
//   try {
//     const { citiesWithData } = await callFetchCitiesWithData(CITIES);
//     const totalPlaceCnt = citiesWithData.reduce(
//       (total, city) => total + city.spotCnt,
//       0
//     );

//     return {
//       props: {
//         citiesWithData,
//         totalPlaceCnt,
//       },
//       revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
//     };
//   } catch (err: any) {
//     return {
//       props: {
//         citiesWithData: [],
//         totalPlaceCnt: 0,
//       },
//     };
//   }
// };
