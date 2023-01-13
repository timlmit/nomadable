import Link from "next/link";
import React, { Fragment, ReactNode, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { toMonthDate } from "../../modules/DateUtils";
import { CheckInHistoryItem } from "../../redux/slices/checkInSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonText } from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { Header1, Header3 } from "../../styles/styled-components/Texts";
import { CircleAndBorder } from "./CircleAndBorder";

interface Props {
  checkInHistory: CheckInHistoryItem[];
}

export const CheckInHistory: React.FC<Props> = ({ checkInHistory }) => {
  const [toggleId, setToggleId] = useState("");

  const toggleCheckIns = (id: string) => {
    setToggleId(id);
  };

  const jumpTo = (placeId: string) => {
    window.open(`/place/${placeId}`, "_blank");
  };

  const elements: ReactNode[] = [];
  let tempCheckInElements: any = {};
  let prevYear = "";
  let prevCountry = "";
  let countryIndex = 0;

  checkInHistory.forEach((ch) => {
    const date = new Date(ch.checkInTime);
    const yearLabel = date.getFullYear().toString();

    if (prevCountry !== ch.placeCountry) countryIndex++;
    const countryId = `${yearLabel}-${ch.placeCountry}-${countryIndex}`;

    if (yearLabel !== prevYear) {
      elements.push(<YearLabel>{yearLabel}</YearLabel>);
      prevYear = yearLabel;
      prevCountry = "";
    }

    if (ch.placeCountry !== prevCountry) {
      tempCheckInElements[countryId] = [];

      elements.push(
        <CountryWrapper>
          <CircleAndBorder />
          <CountryLabel>{ch.placeCountry}</CountryLabel>
          <CheckInItems id={countryId} showAll={toggleId === countryId}>
            {tempCheckInElements[countryId]}
            <OverlayWhite showAll={toggleId === countryId} />
          </CheckInItems>
          {
            <ToggleButton
              onClick={
                toggleId !== countryId
                  ? () => toggleCheckIns(countryId)
                  : () => toggleCheckIns("")
              }
            >
              {toggleId !== countryId ? "Show All" : "Hide"}
            </ToggleButton>
          }
        </CountryWrapper>
      );
      prevCountry = ch.placeCountry;
      // countryIndex++;
    }

    tempCheckInElements[countryId].push(
      <CheckInItem>
        <Link href={`/place/${ch.placeId}`} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <CheckInImage src={ch.placeImage} />
            <CheckInPlaceName>{ch.placeName}</CheckInPlaceName>
            <CheckInDate>{toMonthDate(new Date(ch.checkInTime))}</CheckInDate>
          </a>
        </Link>
      </CheckInItem>
    );
  });

  return <Wrapper>{elements}</Wrapper>;
};

const Wrapper = styled.div``;

const CheckInItems = styled.div<{ showAll: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  max-height: 10rem;
  overflow: hidden;

  ${forMobile(`
    gap: 0.8rem;
`)}

  ${(props) =>
    props.showAll &&
    `
    max-height: 100%;

  `}
`;

const OverlayWhite = styled.div<{ showAll: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  ${(props) =>
    !props.showAll &&
    `
    background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 90%,
    rgba(255, 255, 255, 1) 100%
  );
  `}
`;

const CheckInItem = styled.div`
  width: calc(20% - 1rem);
  ${ClickableStyle}

  ${forMobile(`
    width: calc(33% - 0.5rem);
`)}
`;

const CheckInImage = styled.img`
  width: 100%;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const CheckInPlaceName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  ${fs.FontSizeSemiSmall}
  color: ${cons.FONT_COLOR_NORMAL};
`;

const CheckInDate = styled.div`
  ${fs.FontSizeSmall};
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const ToggleButton = styled.button`
  ${ButtonText};
  padding: 0;
  margin-top: 1rem;
  text-decoration: underline;
`;

const YearLabel = styled.div`
  ${Header1};
  margin: 0;
  /* margin-bottom: 1rem; */
  position: relative;
  /* background-color: white; */
  z-index: 1;
  padding-top: 1.5rem;
  padding-bottom: 1rem;

  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 10%,
    rgba(255, 255, 255, 1) 90%,
    rgba(255, 255, 255, 0) 100%
  );

  ${forMobile(`
    margin: 0;
`)}
`;

const CountryLabel = styled.div`
  ${Header3};
  margin: 0;
  margin-bottom: 2rem;
`;

const CountryWrapper = styled.div`
  margin-bottom: 2rem;
  padding-left: 1.8rem;
  position: relative;
  /* overflow: hidden; */
  /* transform: translateX(2rem); */
`;

export const HideTop = styled.div`
  position: absolute;
  top: -2rem;
  width: 100%;
  background-color: white;
  height: 2.5rem;

  /* background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  ); */
`;
