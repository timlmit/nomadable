import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  callFetchArticlesWithData,
  callFetchCitiesWithData,
} from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import { ArticleSection } from "../../components/article/ArticleSection";
import { CitySection } from "../../components/cities/city/CitySection";
import { Layout } from "../../components/commons/Layout";
import {
  CONTAINER_WIDTH_NARROW,
  CONTAINER_WIDTH_SO_NARROW,
} from "../../constants";
import {
  ARTICLES,
  Article,
  ArticleWithData,
} from "../../data/articles/articles";

interface Props {
  articleWithData: ArticleWithData;
}

const ArticlePage: React.FC<Props> = (props) => {
  const router = useRouter();
  const [_article, setArticle] = useState<ArticleWithData>(
    props.articleWithData
  );

  /**
   * Functions
   */
  const fetchArticle = async (articleSlug: string) => {
    const article = ARTICLES.find((at) => at.slug === articleSlug);
    if (!article) return;
    const { articlesWithData } = await callFetchArticlesWithData([article]);
    setArticle(articlesWithData[0]);
  };

  /**
   * Efect
   */

  useEffect(() => {
    if (
      router.query.articleSlug &&
      typeof router.query.articleSlug === "string"
    ) {
      fetchArticle(router.query.articleSlug);
    }
  }, [router.query]);

  /**
   * Render
   */

  if (!_article) return null;

  return (
    <Layout width={CONTAINER_WIDTH_SO_NARROW} fixed>
      <Breadcrumb
        breadcrumbs={[
          { text: "Cities", url: "/cities" },
          {
            text: `${_article.city.city}, ${_article.city.country}`,
            url: `/cities/${_article.city.slug}`,
          },
          { text: ``, url: `/article/${_article.slug}` },
        ]}
      />
      <ArticleSection articleWithData={_article || props.articleWithData} />
    </Layout>
  );
};

export default ArticlePage;

/**
 * SSR
 */

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const articleSlugs = ARTICLES.map((at) => at.slug);

    const paths = articleSlugs.map((articleSlug: string) => {
      return {
        params: {
          articleSlug,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    return {
      paths: [{ params: { articleSlug: "" } }],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.articleSlug !== "string") throw Error;

    // get city data
    const article = ARTICLES.find((at) => at.slug === params.articleSlug);
    if (!article) throw Error;

    // get articles
    console.log("fetching");
    const { articlesWithData } = await callFetchArticlesWithData([article]);
    console.log(
      "🚀 ~ file: [articleSlug].tsx ~ line 118 ~ constgetStaticProps:GetStaticProps= ~ articlesWithData",
      articlesWithData
    );

    return {
      props: {
        articleWithData: articlesWithData[0],
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        articleWithData: null,
      },
    };
  }
};
