import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { ButtonText } from "../../../styles/styled-components/Buttons";
import * as fs from "../../../styles/styled-components/FontSize";

interface Props {
  googlePlaceId: string;
  spotAddress: string;
}

export const LocationInfo: React.FC<Props> = ({
  googlePlaceId,
  spotAddress,
}) => {
  const onClickLink = () => {
    window.open(`${cons.LOCATION_LINK_PLACE_ID}${googlePlaceId}`);
  };

  return (
    <LocationInfoWrapper>
      <Label>Location</Label>
      <Card>
        <Address>
          <AddressIcon src="/icon/pin-black.png" />
          {spotAddress}
        </Address>
        <MapButton onClick={onClickLink}>
          <LinkIcon src="/icon/external-link-black.png" />
          Open in Google Map
        </MapButton>
      </Card>
    </LocationInfoWrapper>
  );
};

const LocationInfoWrapper = styled.div`
  width: 100%;
`;

const Label = styled.div`
  ${fs.FontSizeNormal}
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 1.2rem;
`;

const Card = styled.div`
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.4rem;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Address = styled.div`
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  ${fs.FontSizeSemiSmall}
  color: ${cons.FONT_COLOR_LIGHT};
`;

const AddressIcon = styled.img`
  width: 0.8rem;
  opacity: 0.8;
  margin-right: 0.3rem;
  transform: translateY(0.15rem);
`;

const MapButton = styled.button`
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
  ${ButtonText};
  color: ${cons.FONT_COLOR_NORMAL};
  text-decoration: underline;
  display: flex;
  align-items: center;
  ${fs.FontSizeNormal}
`;

const LinkIcon = styled.img`
  width: 1rem;
  margin-right: 0.4rem;
`;
