import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { Place } from "../../../redux/slices/placeSlice";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { NetSpeedIndicator } from "../../commons/NetSpeedIndicator";
import { AnimationSlideUp } from "../../../styles/styled-components/Animations";
import { Bold } from "../../../styles/styled-components/Texts";

interface Props {
  place: Place;
  selected: boolean | undefined;
}

const getCity = (address: string) => {
  const addressArr = address.split(",");
  const countryCityArr = addressArr.slice(
    addressArr.length - 2,
    addressArr.length
  );
  return countryCityArr.join(",");
};

export const PlaceItem: React.FC<Props> = ({ place, selected }) => {
  return (
    <Link href={`/place/${place.id}`} passHref>
      <a target="_blank" rel="noopener">
        <PlaceItemWrapper selected={selected}>
          <ImageWrapper>
            <Image src={place.thumbnail} alt="place image" />
            <SpeedWrapper>
              <NetSpeedIndicator speed={place.speedDown} bgWhite />
            </SpeedWrapper>
            <PlaceType>
              {cons.PLACE_TYPE_LIST[place.placeType].icon}
              {`  `}
              {place.placeType}
            </PlaceType>
          </ImageWrapper>
          <Name>{place.spotName}</Name>
          <Address>{getCity(place.spotAddress)}</Address>
          <CheckInCnt>
            <CheckInNum>{place.testCnt}</CheckInNum> checked in
          </CheckInCnt>
        </PlaceItemWrapper>
      </a>
    </Link>
  );
};

const PlaceItemWrapper = styled.div<{ selected: undefined | boolean }>`
  ${ClickableStyle}
  position: relative;
  ${AnimationSlideUp}

  ${(props) =>
    props.selected === false &&
    `
    // opacity: 0.5;
  `};

  ${(props) =>
    props.selected === true &&
    `
    & img {
      border: 3px solid ${cons.COLOR_RED_0};
      width: calc(100% - 6px);
      height: calc(100% - 6px);
    }
  `};
`;

const ImageWrapper = styled.div`
  height: 15rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const SpeedWrapper = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

const PlaceType = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  /* font-size: ${fs.FontSizeSmall}; */
  font-size: 0.9rem;
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
`;

const Name = styled.div`
  font-weight: 700;
  margin: 0.5rem 0 0.3rem 0;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Address = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall};
  font-weight: 400;
  margin-bottom: 0.3rem;
  /* font-weight: 600; */
`;

const CheckInCnt = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall};
  font-weight: 400;
  margin-bottom: 1.2rem;
`;

const CheckInNum = styled.span`
  /* color: ${cons.FONT_COLOR_NORMAL}; */
  font-weight: 700;
`;
