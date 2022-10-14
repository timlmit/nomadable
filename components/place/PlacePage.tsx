import React, { ReactNode, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import { DiscoveredBy } from "./components/DiscoveredBy";
import { LocationInfo } from "./components/LocationInfo";
import { Reviews } from "./components/Reviews";
import { SpotImages } from "./components/SpotImages";
import { InternetSpeed } from "./components/InternetSpeed";
import { Availability } from "./components/Availability";
import { CheckInModal } from "./check-in-modal/CheckInModal";
import { SectionLoader } from "../commons/SectionLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiCheckIn,
  selectApiCheckInStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import { selectAuthenticated } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import { apiPostReview } from "../../redux/slices/api/apiReviewSlice";
import { getStarValue } from "./components/review/ReviewScore";

interface Props {
  placeWithData: PlaceWithData;
}

export const PlacePage: React.FC<Props> = ({ placeWithData }) => {
  const pd = placeWithData;
  const dispatch = useAppDispatch();

  const apiStatusCheckIn = useAppSelector(selectApiCheckInStatus);
  const isAuthenticated = useAppSelector(selectAuthenticated);

  const [checkInModalVisible, setCheckInModalVisible] = useState(false);

  /**
   * User Interface
   */

  const onClickSpeedTest = () => {
    if (!isAuthenticated) {
      window.alert("Please login to use the check-in feature.");
      return;
    }

    setCheckInModalVisible(true);
  };

  const closeCheckInModal = () => {
    setCheckInModalVisible(false);
  };

  const onCheckIn = (speedDown: number, speedUp: number) => {
    // check in
    setCheckInModalVisible(false);
    dispatch(apiCheckIn({ placeId: placeWithData.id, speedDown, speedUp }));
  };

  /**
   * Render
   */

  const InfoItemWrapper = ({
    label,
    children,
  }: {
    label: string;
    children: ReactNode;
  }) => {
    return (
      <InfoItem>
        <InfoLabel>{label}</InfoLabel>
        {children}
      </InfoItem>
    );
  };

  return (
    <PlacePageWrapper>
      <SpotName>{pd.spotName}</SpotName>
      <ReviewInfo>
        {pd.reviewStars > 0 && (
          <ReviewStars>
            <StarIcon src="/icon/star-black.svg" />
            {getStarValue(pd.reviewStars)}
            <ReviewCnt>({pd.reviewsWithData.length})</ReviewCnt>
            {/* <Dot>&#x2022;</Dot> */}
          </ReviewStars>
        )}
      </ReviewInfo>
      <ImageWrapper>
        <SpotImages images={pd.images} />
      </ImageWrapper>
      <InfoWrapper>
        <RightSection>
          <LocationInfo
            googlePlaceId={pd.googlePlaceId}
            spotAddress={pd.spotAddress}
          />
        </RightSection>
        <LeftSection>
          <InfoItemWrapper label="Internet Speed">
            <InternetSpeed
              speedUp={pd.speedUp}
              speedDown={pd.speedDown}
              testCnt={pd.recentCheckInCnt}
              checkedInByUser={pd.checkedInByUser}
              onClickSpeedTest={onClickSpeedTest}
              loading={apiStatusCheckIn.status === cons.API_LOADING}
            />
          </InfoItemWrapper>
          <InfoItemWrapper label="Basic Info">
            <Availability availability={pd.availability} />
          </InfoItemWrapper>
          <InfoItemWrapper label="Reviews">
            <Reviews
              reviewsWithData={pd.reviewsWithData}
              reviewStars={pd.reviewStars}
              placeId={pd.id}
            />
          </InfoItemWrapper>
          <DiscoveredByWrapper>
            <DiscoveredBy
              userId={pd.discoveredBy}
              userName={pd.userName}
              userTitle={pd.userTitle}
              userPicture={pd.userPicture}
            />
          </DiscoveredByWrapper>
        </LeftSection>
      </InfoWrapper>
      <CheckInModal
        visible={checkInModalVisible}
        onClose={closeCheckInModal}
        spotLat={pd.spotLat}
        spotLng={pd.spotLng}
        onCheckIn={onCheckIn}
      />
    </PlacePageWrapper>
  );
};

const PlacePageWrapper = styled.div`
  padding-bottom: 4rem;
`;

const SpotName = styled.div`
  ${fs.FontSizeExLarge};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 2rem;
`;

const ReviewInfo = styled.div`
  margin-top: 0.8rem;
`;

const ImageWrapper = styled.div`
  margin-top: 1.4rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  ${forMobile(`
    flex-direction: column;
 `)}
`;

const LEFT_WIDTH = 42;

const RightSection = styled.div`
  flex-grow: 1;
  margin-left: 3rem;
  margin-top: 2.2rem;
  width: calc(100% - ${LEFT_WIDTH}rem);

  ${forMobile(`
    width: 100%;
    margin-left: 0;
 `)}
`;

const LeftSection = styled.div`
  width: ${LEFT_WIDTH}rem;

  ${forMobile(`
    width: 100%;
 `)}
`;

const DiscoveredByWrapper = styled.div`
  margin-top: 3rem;
`;

const InfoItem = styled.div`
  margin-top: 2rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding-bottom: 2.5rem;
`;

const InfoLabel = styled.div`
  ${fs.FontSizeLarge}
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 1.5rem;
`;

const ReviewStars = styled.div`
  ${fs.FontSizeNormal};
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
`;

const StarIcon = styled.img`
  width: 0.75rem;
  margin-right: 0.15rem;
`;

const ReviewCnt = styled.div`
  font-weight: 400;
  margin-left: 0.2rem;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const Dot = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  margin-left: 0.2rem;
`;
