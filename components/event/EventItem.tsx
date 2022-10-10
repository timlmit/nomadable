import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { convertTimestampToTimeAgo } from "../../modules/DateUtils";
import { EventWithData } from "../../redux/slices/eventSlice";
import {
  FontSizeNormal,
  FontSizeSemiSmall,
} from "../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { PlaceCard } from "./PlaceCard";

interface Props {
  eventWithData: EventWithData;
}

export const EventItem: React.FC<Props> = ({
  eventWithData: {
    _id,
    userId,
    title,
    timestamp,
    placeId,
    body,
    isOfficial,
    // user
    userPicture,
    userSubId,
    // place
    placePictures,
    placeType,
    placeName,
    placeAddress,
  },
}) => {
  return (
    <Wrapper>
      <ItemContainer>
        <ProfilePic src={userPicture} />
        <MainSection>
          <MainSectionInner>
            <TitleRow>
              <UserSubId>@{userSubId}</UserSubId>
              {`${title}`}
              <DateTime>{convertTimestampToTimeAgo(timestamp)}</DateTime>
            </TitleRow>
            <Body>{body}</Body>
            {placeId && (
              <PlaceCard
                placeId={placeId}
                pictures={placePictures}
                name={placeName}
                address={placeAddress}
              />
            )}
          </MainSectionInner>
        </MainSection>
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const ItemContainer = styled.div`
  ${ContainerStyleInside};
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: flex-start;
`;

const ProfilePic = styled.img`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
`;

const MainSection = styled.div`
  margin-left: 1.2rem;
`;

const MainSectionInner = styled.div`
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  ${FontSizeNormal};
  /* color: ${cons.FONT_COLOR_SECONDARY}; */
  font-weight: 400;
`;

const UserSubId = styled.div`
  font-weight: bold;
  margin-right: 0.4em;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const DateTime = styled.div`
  margin-left: 0.8em;
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall}
`;

const Body = styled.div``;
