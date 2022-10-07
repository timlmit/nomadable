import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { apiFetchPlaces } from "../../redux/slices/api/apiPlaceSlice";
import { MapArea, Place } from "../../redux/slices/placeSlice";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { MapSearch } from "../commons/MapSearch";
import { SearchResult } from "./search-result/SearchResult";

interface Props {
  places: Place[];
}

export const TopPage: React.FC<Props> = ({ places }) => {
  const dispatch = useAppDispatch();

  const [mapArea, setMapArea] = useState<null | MapArea>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState("");

  /**
   * Modules
   */

  const searchPlaces = (mapArea: MapArea, pageIndex: number) => {
    dispatch(
      apiFetchPlaces({
        mapArea,
        pageIndex,
      })
    );
  };

  /**
   * User Interface
   */

  const onChangeMapArea = (
    latStart: number,
    lngStart: number,
    latEnd: number,
    lngEnd: number
  ) => {
    setMapArea({
      latStart,
      lngStart,
      latEnd,
      lngEnd,
    });
  };

  const onClickMarker = (placeId: string) => {
    setSelectedPlace(placeId);
  };

  const onChangePageIndex = (pageIndex: number) => {
    setPageIndex(pageIndex);
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (!mapArea) return;
    searchPlaces(mapArea, pageIndex);
  }, [mapArea, pageIndex]);

  /**
   * Render
   */

  return (
    <TopPageWrapper>
      <SearchResultSection>
        <SearchResult
          places={places}
          onChangePageIndex={onChangePageIndex}
          width={RESULT_WIDTH}
          selectedPlace={selectedPlace}
        />
      </SearchResultSection>
      <MapSection>
        <MapSearch
          mapId="search-places"
          places={places}
          onChange={onChangeMapArea}
          onClickMarker={onClickMarker}
          selectedPlace={selectedPlace}
        />
      </MapSection>
    </TopPageWrapper>
  );
};

const HEADER_HEIGHT = 5;
const RESULT_WIDTH = 36;

const TopPageWrapper = styled.div`
  display: flex;
  width: calc(100% + 4rem);
  margin-left: -2rem;
  min-height: calc(100vh - ${HEADER_HEIGHT}rem);
  padding-top: ${HEADER_HEIGHT}rem;
`;

const SearchResultSection = styled.div`
  width: ${RESULT_WIDTH}rem;
`;

const MapSection = styled.div`
  width: calc(100% - ${RESULT_WIDTH}rem);
  height: calc(100vh - ${HEADER_HEIGHT}rem);
  position: fixed;
  top: ${HEADER_HEIGHT}rem;
  right: 0;
`;
