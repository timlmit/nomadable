import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apiFetchSpotInfo,
  apiFetchSpotsByText,
  selectApiFetchSpotInfoStatus,
  selectApiFetchSpotsByTextStatus,
  SpotPrediction,
} from "../../../redux/slices/api/apiSpotSlice";
import {
  clearPlaceInfoOfNewPlace,
  selectNewPlace,
  selectPlaceSearchResult,
  setSpotNameToNewPlace,
} from "../../../redux/slices/newPlaceSlice";
import { Place } from "../../../redux/slices/placeSlice";
import { MapWithPin } from "../../commons/MapWithPin";
import { SectionLoader } from "../../commons/SectionLoader";
import { PlaceFormShell } from "../PlaceFormShell";
import { PlaceSearchForm } from "./PlaceSearchForm";

interface Props {
  pageIndex: number;
  onClickNext: () => void;
  newPlace: Place;
}

export const PlaceForm: React.FC<Props> = ({
  pageIndex,
  onClickNext,
  newPlace,
}) => {
  const dispatch = useAppDispatch();
  const placeSearchResult = useAppSelector(selectPlaceSearchResult);
  const apiStatusSearchSpot = useAppSelector(selectApiFetchSpotsByTextStatus);
  const apiStatusFetchSpotInfo = useAppSelector(selectApiFetchSpotInfoStatus);

  const searchPlace = (text: string) => {
    dispatch(apiFetchSpotsByText({ text }));
  };

  const selectPlace = (spot: SpotPrediction) => {
    dispatch(setSpotNameToNewPlace({ spot }));
    dispatch(apiFetchSpotInfo({ placeId: spot.placeId }));
  };

  const clearSelectedPlace = () => {
    dispatch(clearPlaceInfoOfNewPlace());
  };

  return (
    <PlaceFormShell
      pageIndex={pageIndex}
      pageLabel="1. What place are you adding?"
      buttonText="Next"
      buttonDisabled={newPlace.spotLat === null}
      onClickSubmit={onClickNext}
    >
      <SearchFormWrapper>
        {/* <Label>Search Place</Label> */}
        <PlaceSearchForm
          searchPlace={searchPlace}
          placeSearchResult={placeSearchResult}
          selectPlace={selectPlace}
          selectedPlace={{
            googlePlaceId: newPlace.googlePlaceId,
            spotLat: newPlace.spotLat,
            spotLng: newPlace.spotLng,
            spotName: newPlace.spotName,
            spotAddress: newPlace.spotAddress,
          }}
          clearSelectedPlace={clearSelectedPlace}
          isSearching={apiStatusSearchSpot.status === cons.API_LOADING}
        />
      </SearchFormWrapper>
      <MapWrapper
        visible={
          apiStatusFetchSpotInfo.status === cons.API_LOADING ||
          newPlace.spotLat !== null
        }
      >
        <SectionLoader
          visible={apiStatusFetchSpotInfo.status === cons.API_LOADING}
        />
        <MapWithPin
          interactive={false}
          lat={newPlace.spotLat}
          lng={newPlace.spotLng}
          mapId="create-place"
        />
      </MapWrapper>
    </PlaceFormShell>
  );
};

const SearchFormWrapper = styled.div``;

// const Label = styled.div`
//   font-weight: bold;
//   color: ${cons.FONT_COLOR_NORMAL};
//   margin-bottom: 1rem;
// `;

const MapWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  width: 100%;
  height: 20rem;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  margin-top: 2rem;
  border-radius: 0.4rem;
  overflow: hidden;

  display: none;
  ${(props) =>
    props.visible &&
    `
    
    display:block;
  `};
`;
