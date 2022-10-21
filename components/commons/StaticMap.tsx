import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
}

const BASE_URL = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/`;
const ACCESS_TOKEN = `pk.eyJ1IjoieXMwNTIwIiwiYSI6ImNsOHIzZTdhNDB5MGczcXJ1cW41bzJ4YmsifQ.mLHbDsXmbrmjxIIbkY4j1A`;

export const StaticMap: React.FC<Props> = (props) => {
  return (
    <StaticMapWrapper>
      <MapImage
        src={`${BASE_URL}${props.lng},${props.lat},${props.zoom || 11},0/${
          props.width || 600
        }x${props.height || 600}?access_token=${ACCESS_TOKEN}`}
      />
    </StaticMapWrapper>
  );
};

const StaticMapWrapper = styled.div``;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
