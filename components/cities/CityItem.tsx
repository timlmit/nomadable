import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CityWithData } from "../../data/articles/cities";
import { AnimationSlideUp } from "../../styles/styled-components/Animations";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  cityWithData: CityWithData;
}

export const CityItem: React.FC<Props> = ({ cityWithData }) => {
  const ct = cityWithData;

  return (
    <Link href={`/cities/${ct.slug}`} passHref>
      <CityItemWrapper>
        <CityCard imgUrl={ct.thumbnail}>
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
          <Bold>{ct.spotCnt}</Bold> spots to work from
        </Label>
      </CityItemWrapper>
    </Link>
  );
};

const CityItemWrapper = styled.a`
  color: white;
  ${ClickableStyle}
  height: 13rem;
  width: 25%;
  ${AnimationSlideUp}
  display:block;
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
`;

const CountryName = styled.div`
  ${fs.FontSizeNormal}
  font-weight: bold;
  margin-top: 0.4rem;
`;

const Label = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 0.6rem;
`;

const Bold = styled.span`
  font-weight: bold;
`;
