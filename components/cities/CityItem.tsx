import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Boundary, CityWithData } from "../../data/articles/cities";
import { forMobile } from "../../styles/Responsive";
import {
  AnimationFadeIn,
  AnimationSlideUp,
} from "../../styles/styled-components/Animations";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  cityWithData: CityWithData;
}

export const CityItem: React.FC<Props> = ({ cityWithData }) => {
  const ct = cityWithData;

  const makeQueryString = (boundary: Boundary | null): string => {
    if (!boundary) return cons.PATH_HOME;
    const { latStart, lngStart, latEnd, lngEnd } = boundary;
    const queryString = `${cons.PATH_HOME}?latStart=${latStart}&lngStart=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`;
    return queryString;
  };

  return (
    <Link href={makeQueryString(ct.boundary)} passHref>
      <CityItemWrapper>
        <CityCard imgUrl={ct.thumbnail || ""}>
          <AvgSpeed>
            <AvgSpeedIcon src="/icon/wifi-white.svg" />
            <AvgSpeedNum>
              {Math.round(ct.avgSpeed)}
              <AvgSpeedUnit>mbps</AvgSpeedUnit>
            </AvgSpeedNum>
          </AvgSpeed>
          <CityName>{ct.city}</CityName>
          <CountryName>{ct.country}</CountryName>
        </CityCard>
        <Label>
          <Bold>{ct.spotCnt}</Bold> places to work from
        </Label>
      </CityItemWrapper>
    </Link>
  );
};

const CityItemWrapper = styled.a`
  color: white;
  ${ClickableStyle}
  height: 13rem;
  width: calc(25% - 1.13rem);
  ${AnimationFadeIn}
  display: block;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 1200px) {
    width: calc(33.3333% - 1rem);
    margin-bottom: 1.6rem;
    height: 11rem;
  }

  @media only screen and (max-width: 1000px) {
    width: calc(50% - 0.8rem);
    margin-bottom: 1.6rem;
    height: 11rem;
  }

  ${forMobile(`
    width: calc(50% - 0.35rem);
    margin-bottom: 1.6rem;
    height: 11rem;
  `)}
`;

const CityCard = styled.div<{ imgUrl: string }>`
  position: relative;
  height: 100%;
  border-radius: 0.8rem;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.imgUrl});
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & div {
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.1), 1px -1px 0 rgba(0, 0, 0, 0.1),
      -1px 1px 0 rgba(0, 0, 0, 0.1), 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
`;

const AvgSpeed = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: flex-start;
`;

const AvgSpeedIcon = styled.img`
  width: 1.3rem;
  margin-right: 0.4rem;
  transform: translateY(0.05rem);
`;

const AvgSpeedNum = styled.div`
  ${fs.FontSizeSemiLarge}
  font-weight:bold;
`;

const AvgSpeedUnit = styled.div`
  ${fs.FontSizeSmall}
`;

const CityName = styled.div`
  ${fs.FontSizeExLarge}
  font-weight: bold;
  text-align: center;

  ${forMobile(`
      font-size: 1.6rem;
  `)}
`;

const CountryName = styled.div`
  ${fs.FontSizeNormal}
  font-weight: bold;
  margin-top: 0.4rem;
`;

const Label = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 0.6rem;

  ${forMobile(`
  margin-top: 0.2rem;
  `)}
`;

const Bold = styled.span`
  font-weight: bold;
`;
