import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  callFetchArticlesWithData,
  callFetchCitiesWithData,
} from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import { CitySection } from "../../components/cities/city/CitySection";
import { Layout } from "../../components/commons/Layout";
import { CONTAINER_WIDTH_NARROW } from "../../constants";
import {
  ARTICLES,
  Article,
  ArticleWithData,
} from "../../data/articles/articles";

import { CITIES, City, CityWithData } from "../../data/articles/cities";

interface Props {
  cityWithData: CityWithData;
  articlesWithData: ArticleWithData[];
}

const CityPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const [ct, setCityWithData] = useState<CityWithData>(props.cityWithData);
  const [_articles, setArticles] = useState<ArticleWithData[]>(
    props.articlesWithData
  );

  /**
   * Functions
   */

  const fetchCityData = async () => {
    const citySlug = router.query.citySlug;
    if (!citySlug) return;

    const city: City | undefined = CITIES.find((c) => c.slug === citySlug);
    if (!city) return;

    const { citiesWithData } = await callFetchCitiesWithData([city]);
    setCityWithData(citiesWithData[0]);
  };

  const fetchArticles = async (citySlug: string) => {
    const articles = ARTICLES.filter((at) => at.city.slug === citySlug);
    const { articlesWithData } = await callFetchArticlesWithData(articles);
    setArticles(articlesWithData);
  };

  /**
   * Efect
   */

  useEffect(() => {
    fetchCityData();
    if (router.query.citySlug && typeof router.query.citySlug === "string") {
      fetchArticles(router.query.citySlug);
    }
  }, [router.query]);

  /**
   * Render
   */

  if (!ct) return null;

  return (
    <Layout width={CONTAINER_WIDTH_NARROW} fixed>
      <Breadcrumb
        breadcrumbs={[
          { text: "Cities", url: "/cities" },
          { text: `${ct.city}, ${ct.country}`, url: `/cities/${ct.slug}` },
        ]}
      />
      <CitySection
        cityWithData={ct || props.cityWithData}
        articlesWithData={_articles}
      />
    </Layout>
  );
};

export default CityPage;

/**
 * SSR
 */

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const citySlugs = CITIES.map((city) => city.slug);

    const paths = citySlugs.map((citySlug: string) => {
      return {
        params: {
          citySlug,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    return {
      paths: [{ params: { citySlug: "" } }],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.citySlug !== "string") throw Error;

    // get city data
    const city = CITIES.find((_city) => _city.slug === params.citySlug);
    if (!city) throw Error;
    const { citiesWithData } = await callFetchCitiesWithData([city]);

    // get articles
    const articles = ARTICLES.filter((at) => at.city.slug === city.slug);
    const { articlesWithData } = await callFetchArticlesWithData(articles);

    return {
      props: {
        cityWithData: citiesWithData[0],
        articlesWithData,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        cityWithData: null,
        articlesWithData: [],
      },
    };
  }
};
