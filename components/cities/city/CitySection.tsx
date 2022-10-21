import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { Article, ArticleWithData } from "../../../data/articles/articles";
import { Boundary, CityWithData } from "../../../data/articles/cities";
import newPlace from "../../../pages/new-place";
import { ButtonRedLarge } from "../../../styles/styled-components/Buttons";
import { CardBoaderCss } from "../../../styles/styled-components/Card";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { Header1, Header2 } from "../../../styles/styled-components/Texts";
import { CardWithImage } from "../../commons/CardWithImage";
import { MapWithPin } from "../../commons/MapWithPin";

import { StaticMap } from "../../commons/StaticMap";

interface Props {
  cityWithData: CityWithData;
  articlesWithData: ArticleWithData[];
}

export const CitySection: React.FC<Props> = (props) => {
  /**
   * Functions
   */

  const makeQueryString = (boundary: Boundary): string => {
    const { latStart, lngStart, latEnd, lngEnd } = boundary;
    const queryString = `/?latStart=${latStart}&lngStart=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`;
    return queryString;
  };

  /**
   * Render
   */

  return (
    <CitySectionWrapper>
      <Card>
        <LeftSection>
          <CardHeader>
            {props.cityWithData.spotCnt} Places to Work From in{" "}
            {props.cityWithData.city}, {props.cityWithData.country}
          </CardHeader>
          <Link href={makeQueryString(props.cityWithData.boundary)} passHref>
            <a target="_blank" rel="noopener">
              <Button>View on Map</Button>
            </a>
          </Link>
        </LeftSection>
        <MapWrapper>
          <StaticMap
            lat={props.cityWithData.center.lat}
            lng={props.cityWithData.center.lng}
          />
        </MapWrapper>
      </Card>

      <ArticleSection>
        <ArticleHeader>Articles</ArticleHeader>
        <ArticlesWrapper>
          {props.articlesWithData.map((at) => (
            <Link href={`/article/${at.slug}`} key={at.slug}>
              <ArticleItemWrapper key={at.slug}>
                <CardWithImage
                  image={at.placesWithData[0].images[0]}
                  title={at.title}
                />
              </ArticleItemWrapper>
            </Link>
          ))}
        </ArticlesWrapper>
      </ArticleSection>
    </CitySectionWrapper>
  );
};

const CitySectionWrapper = styled.div`
  margin-top: 2.8rem;
`;

const Card = styled.div`
  ${CardBoaderCss};
  display: flex;
  overflow: hidden;
  align-items: center;
  height: 17rem;
  max-width: 52rem;
  border-radius: 0.8rem;
`;

const LeftSection = styled.div`
  box-sizing: border-box;
  width: 60%;
  padding: 3rem;
  /* height: 100%; */
`;

const CardHeader = styled.h1`
  ${Header1};
  margin-bottom: 2.5rem;
`;

const Button = styled.button`
  ${ButtonRedLarge};
`;

const MapWrapper = styled.div`
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  width: 40%;
  height: 100%;
  /* border-radius: 0.8rem; */
`;

// Articles

const ArticleSection = styled.div`
  margin-top: 2rem;
`;

const ArticleHeader = styled.div`
  ${Header2};
  margin-bottom: 1rem;
`;

const ArticlesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ArticleItemWrapper = styled.div`
  ${ClickableStyle}
`;
