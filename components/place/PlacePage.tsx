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

interface Props {
  placeWithData: PlaceWithData;
}

export const PlacePage: React.FC<Props> = ({ placeWithData }) => {
  const pd = placeWithData;
  const dispatch = useAppDispatch();

  const apiStatusCheckIn = useAppSelector(selectApiCheckInStatus);

  const [checkInModalVisible, setCheckInModalVisible] = useState(false);

  /**
   * User Interface
   */

  const onClickSpeedTest = () => {
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
      <ReviewInfo>Review Info here</ReviewInfo>
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
          <InfoItemWrapper label="Availability">
            <Availability availability={pd.availability} />
          </InfoItemWrapper>
          <InfoItemWrapper label="Reviews">
            <Reviews />
          </InfoItemWrapper>
          <DiscoveredByWrapper>
            <DiscoveredBy
              userName={pd.userName}
              userDescription={pd.userDescription}
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
`;

const RightSection = styled.div`
  flex-grow: 1;
  margin-left: 3rem;
  margin-top: 2.2rem;
`;

const LeftSection = styled.div`
  width: 48rem;
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
