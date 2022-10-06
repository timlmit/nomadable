import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { apiFetchPlaces } from "../../redux/slices/api/apiPlaceSlice";
import { Place } from "../../redux/slices/placeSlice";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { MapSearch } from "../commons/MapSearch";

interface Props {
  places: Place[];
}

export const TopPage: React.FC<Props> = ({ places }) => {
  const dispatch = useAppDispatch();

  /**
   * Modules
   */

  const searchPlaces = (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => {
    dispatch(
      apiFetchPlaces({
        latStart,
        lngStart,
        latEnd,
        lngEnd,
      })
    );
  };

  /**
   * User Interface
   */

  const onChangeMap = (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => {
    searchPlaces(latStart, lngStart, latEnd, lngEnd);
  };

  /**
   * Render
   */

  return (
    <TopPageWrapper>
      {places.map((place) => {
        return (
          <PlaceItem key={place.id}>
            <Link href={`/place/${place.id}`}>{place.spotName}</Link>
          </PlaceItem>
        );
      })}
      <MapWrapper>
        <MapSearch
          mapId="search-places"
          places={places}
          onChange={onChangeMap}
        />
      </MapWrapper>
    </TopPageWrapper>
  );
};

const TopPageWrapper = styled.div``;

const PlaceItem = styled.div`
  ${ClickableStyle}
`;

const MapWrapper = styled.div`
  width: 50rem;
  height: 50rem;
`;
