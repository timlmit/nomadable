import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changePlaceType,
  toggleAvailabilityOfPlace,
} from "../../../redux/slices/newPlaceSlice";
import { SwitchForm } from "../../commons/SwitchForm";
import { PlaceFormShell } from "../PlaceFormShell";
import { PlaceTypeForm } from "./PlaceTypeForm";
import { Place } from "../../../redux/slices/placeSlice";
import { AnimationSlideLeft } from "../../../styles/styled-components/Animations";
import { selectApiCreatePlaceStatus } from "../../../redux/slices/api/apiPlaceSlice";
import { SectionLoader } from "../../commons/SectionLoader";
import { PageLoader } from "../../commons/PageLoader";
import { ToggleForm } from "./ToggleForm";
import { AvailabilityForm } from "../../app-commons/AvailabilityForm";

interface Props {
  pageIndex: number;
  onClickNext: () => void;
  newPlace: Place;
}

export const DetailForm: React.FC<Props> = ({
  pageIndex,
  onClickNext,
  newPlace,
}) => {
  const dispatch = useAppDispatch();
  const apiStatusCreatePlace = useAppSelector(selectApiCreatePlaceStatus);

  /**
   * User Interface
   */
  const onChangePlaceType = (placeType: string) => {
    dispatch(changePlaceType({ placeType }));
  };

  const onClickSwitch = (item: string) => {
    dispatch(toggleAvailabilityOfPlace({ item }));
  };

  const handleClickSubmit = () => {
    onClickNext();
  };

  /**
   * Render
   */

  return (
    <PlaceFormShell
      pageIndex={pageIndex}
      pageLabel="2. Please tell us more about the place."
      buttonText="Submit"
      buttonDisabled={apiStatusCreatePlace.status === cons.API_LOADING}
      onClickSubmit={handleClickSubmit}
    >
      <SectionLoader
        visible={apiStatusCreatePlace.status === cons.API_LOADING}
      />

      <AvailabilityForm
        placeType={newPlace.placeType}
        availability={newPlace.availability}
        onChangePlaceType={onChangePlaceType}
        onClickSwitch={onClickSwitch}
      />

      <PageLoader
        visible={apiStatusCreatePlace.status === cons.API_LOADING}
        message="Adding Place"
      />
    </PlaceFormShell>
  );
};
