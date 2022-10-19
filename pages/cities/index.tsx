import { GetStaticProps } from "next";
import Image from "next/image";
import React from "react";

import { CITIES, City } from "../../data/articles/cities";

interface Props {
  cities: City[];
}

const Cities: React.FC<Props> = (props) => {
  return (
    <div>
      {CITIES.map((city) => (
        <div key={city.slug}>
          <Image src={city.thumbnail} alt="city" width={100} height={100} />
        </div>
      ))}
    </div>
  );
};

export default Cities;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     if (!params || typeof params.placeId !== "string") throw Error;

//     const cities = CITIES;

//     return {
//       props: {
//         cities,
//       },
//       revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
//     };
//   } catch (err: any) {
//     return {
//       props: {
//         cities: [],
//       },
//     };
//   }
// };
