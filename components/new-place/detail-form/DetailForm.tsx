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

  const onClickSwitch = (item: string) => {
    dispatch(toggleAvailabilityOfPlace({ item }));
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
          <ToggleForm
            title="Is power socket available?"
            item={cons.AVL_POWER_SOCKET}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_POWER_SOCKET)}
          />

          {/* <ToggleForm
            title="Have single origin coffee?"
            item={cons.AVL_SINGLE_ORIGIN}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_SINGLE_ORIGIN)}
          /> */}

          <ToggleForm
            title="Are there food menus?"
            item={cons.AVL_FOOD_MENU}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_FOOD_MENU)}
          />
        </SpecificForms>
      )}

      {newPlace.placeType === cons.PLACE_TYPE_WORKSPACE && (
        <SpecificForms>
          <ToggleForm
            title="Is Drop-in available?"
            item={cons.AVL_DROP_IN}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_DROP_IN)}
          />

          <ToggleForm
            title="Can you rent monitors?"
            item={cons.AVL_RENTAL_MONITOR}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_RENTAL_MONITOR)}
          />
        </SpecificForms>
      )}

      {newPlace.placeType === cons.PLACE_TYPE_PUBLIC && (
        <SpecificForms>
          <ToggleForm
            title="Is it (or does it include) an outdoor space?"
            item={cons.AVL_OPEN_AIR}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_OPEN_AIR)}
          />

          <ToggleForm
            title="Is it (or does it include) an indoor space?"
            item={cons.AVL_INDOOR}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_INDOOR)}
          />
        </SpecificForms>
      )}

      {newPlace.placeType === cons.PLACE_TYPE_HOTEL && (
        <SpecificForms>
          <ToggleForm
            title="Is co-working space available?"
            item={cons.AVL_WORKSPACE}
            onClickSwitch={onClickSwitch}
            active={newPlace.availability.includes(cons.AVL_WORKSPACE)}
          />
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

const LabelIcon = styled.span`
  margin-right: 0.8rem;
`;

const FormWrapper = styled.div`
  margin: 1rem 0 1.5rem 0;
`;

const SpecificForms = styled.div`
  ${AnimationSlideLeft};
  margin-top: 2.5rem;
`;
