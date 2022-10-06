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

  const handleClickSubmit = () => {
    onClickNext();
  };

  const onClickPowerSocket = () => {
    dispatch(toggleAvailabilityOfPlace({ item: cons.AVL_POWER_SOCKET }));
  };

  const onClickDropIn = () => {
    dispatch(toggleAvailabilityOfPlace({ item: cons.AVL_DROP_IN }));
  };

  const onClickCoworkingSpace = () => {
    dispatch(toggleAvailabilityOfPlace({ item: cons.AVL_WORKSPACE }));
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
      <Label>Type of place</Label>
      <FormWrapper>
        <PlaceTypeForm
          onChange={onChangePlaceType}
          placeType={newPlace.placeType}
        />
      </FormWrapper>

      {newPlace.placeType === cons.PLACE_TYPE_CAFE && (
        <SpecificForms>
          <Label>Is power socket available?</Label>
          <FormWrapper>
            <SwitchForm
              onClick={onClickPowerSocket}
              active={newPlace.availability.includes(cons.AVL_POWER_SOCKET)}
              activeText="Yes"
              inactiveText="No"
            />
          </FormWrapper>
        </SpecificForms>
      )}

      {newPlace.placeType === cons.PLACE_TYPE_WORKSPACE && (
        <SpecificForms>
          <Label>Is Drop-in available?</Label>
          <FormWrapper>
            <SwitchForm
              onClick={onClickDropIn}
              active={newPlace.availability.includes(cons.AVL_DROP_IN)}
              activeText="Yes"
              inactiveText="No"
            />
          </FormWrapper>
        </SpecificForms>
      )}

      {newPlace.placeType === cons.PLACE_TYPE_HOTEL && (
        <SpecificForms>
          <Label>Is coworking space available?</Label>
          <FormWrapper>
            <SwitchForm
              onClick={onClickCoworkingSpace}
              active={newPlace.availability.includes(cons.AVL_WORKSPACE)}
              activeText="Yes"
              inactiveText="No"
            />
          </FormWrapper>
        </SpecificForms>
      )}

      <PageLoader
        visible={apiStatusCreatePlace.status === cons.API_LOADING}
        message="Adding Place"
      />
    </PlaceFormShell>
  );
};

const Label = styled.div`
  font-weight: bold;
  ${fs.FontSizeSemiLarge}
  color: ${cons.FONT_COLOR_NORMAL};
`;

const FormWrapper = styled.div`
  margin: 1rem 0 2rem 0;
`;

const SpecificForms = styled.div`
  ${AnimationSlideLeft}
`;
