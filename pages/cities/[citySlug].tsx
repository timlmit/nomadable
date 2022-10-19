import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { callFetchAllPlaceIds, callFetchPlace } from "../../calls/placeCalls";

import { CITIES, City } from "../../data/articles/cities";

interface Props {
  city: City;
}

const CityPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const city = CITIES.find((city) => city.slug === router.query.citySlug);

  return <div>{city?.boundary}</div>;
};

export default CityPage;

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const citySlugs = CITIES.map((city) => city.slug);

//     const paths = citySlugs.map((citySlug: string) => {
//       return {
//         params: {
//           citySlug,
//         },
//       };
//     });

//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (err) {
//     return {
//       paths: [{ params: { citySlug: "" } }],
//       fallback: true,
//     };
//   }
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     if (!params || typeof params.citySlug !== "string") throw Error;

//     const city = CITIES.find((_city) => _city.slug === params.citySlug);

//     return {
//       props: {
//         city,
//       },
//       revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
//     };
//   } catch (err: any) {
//     return {
//       props: {
//         city: null,
//       },
//     };
//   }
// };
