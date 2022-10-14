import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  places: Place[];
  fetchMore: () => void;
}

export const MyDiscoveredPlaces: React.FC<Props> = ({ places, fetchMore }) => {
  return (
    <DiscoveredPlacesWrapper>
      {places.map((p) => p.spotName)}
      <button onClick={fetchMore}>more</button>
    </DiscoveredPlacesWrapper>
  );
};

const DiscoveredPlacesWrapper = styled.div``;
