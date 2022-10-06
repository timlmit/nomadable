import React, { useState } from "react";
import styled from "styled-components";
import {
  getCurrentLocation,
  getDistanceFromLatLngInKm,
} from "../../../modules/Location";
import {
  ButtonBlackSmall,
  ButtonPrimarySmall,
} from "../../../styles/styled-components/Buttons";
import { MapWithPin } from "../../commons/MapWithPin";
import { SectionLoader } from "../../commons/SectionLoader";
import { Description, Footer, Title } from "./CheckInModalStyles";

interface Props {
  onVerified: () => void;
  spotLat: number;
  spotLng: number;
}

export const LocationVerification: React.FC<Props> = (props) => {
  const [requestingLocation, setRequestingLocation] = useState(false);
  const [latLng, setLatLng] = useState<undefined | [lat: number, lng: number]>(
    undefined
  );

  /**
   * User Interface
   */

  const onClickVerify = async () => {
    setRequestingLocation(true);
    const location = await getCurrentLocation();
    setRequestingLocation(false);

    if (!location) {
      window.alert(
        "Location request failed. If you are using VPN, please disable it."
      );
      return;
    }

    setLatLng([location.lat, location.lng]);

    const distanceKm = getDistanceFromLatLngInKm(
      props.spotLat,
      props.spotLng,
      location.lat,
      location.lng
    );

    if (distanceKm > 0.5) {
      window.alert(
        "The location is not correct. Please check if you are actually inside the place."
      );
      return;
    }

    // location verified
    props.onVerified();
  };

  /**
   * Render
   */

  return (
    <Wrapper>
      <Title>Please Verify Your Location</Title>

      <Description>
        The browser will request your location information. Please allow it to
        proceed. (The information will only be used one time and will be
        discarded immediately)
      </Description>

      <MapWrapper>
        <SectionLoader visible={requestingLocation} />
        <MapWithPin
          lat={props.spotLat}
          lng={props.spotLng}
          interactive={false}
          mapId="location-verification"
        />
      </MapWrapper>
      <Footer>
        <ButtonVerify onClick={onClickVerify} disabled={requestingLocation}>
          {requestingLocation ? "Verifiying..." : "Verify"}
        </ButtonVerify>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const MapWrapper = styled.div`
  height: 14rem;
  border-radius: 0.3rem;
  overflow: hidden;
  position: relative;
`;

const ButtonVerify = styled.button`
  ${ButtonPrimarySmall};
  width: 100%;
`;

const ButtonNext = styled.button`
  ${ButtonBlackSmall};
  width: 100%;
`;
