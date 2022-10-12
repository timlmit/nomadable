import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import newPlace from "../../../pages/new-place";
import { FilterObj, initialFilterObj } from "../../../redux/slices/placeSlice";
import { forMobile } from "../../../styles/Responsive";
import { AnimationSlideLeft } from "../../../styles/styled-components/Animations";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../../styles/styled-components/Buttons";
import { FormLabelStyle } from "../../../styles/styled-components/Forms";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { Modal } from "../../commons/Modal";
import { ModalHeader } from "../../commons/ModalHeader";
import { ToggleForm } from "../../new-place/detail-form/ToggleForm";
// import { FilterForCafe } from "./filters/FilterForCafe";
import { FilterComponent } from "./filters/FilterComponent";

interface Props {
  visible: boolean;
  filterObj: FilterObj;
  onClickFilterSave: (filterObj: FilterObj) => void;
  closeModal: () => void;
}

export const FilterModal: React.FC<Props> = ({
  visible,
  filterObj,
  onClickFilterSave,
  closeModal,
}) => {
  const [localFilterObj, setFilterObj] = useState(filterObj);

  /**
   * User Interface
   */

  const onCloseModal = () => {
    setFilterObj(filterObj);
    closeModal();
  };

  const onChangePlaceTypes = (placeTypes: string[]) => {
    setFilterObj({ ...localFilterObj, placeTypes });
  };

  const onChangeAvailability = (availability: string[]) => {
    setFilterObj({ ...localFilterObj, availability });
  };

  const onClickClear = () => {
    setFilterObj(initialFilterObj);
  };

  const onClickSearch = () => {
    onClickFilterSave(localFilterObj);
    closeModal();
  };

  /**
   * Effect
   */

  useEffect(() => {
    setFilterObj({
      ...localFilterObj,
      availability: [],
    });
  }, [localFilterObj.placeTypes]);

  /**
   * Render
   */

  return (
    <Modal visible={visible} closeModal={onCloseModal} width="36rem" alignTop>
      <ModalHeader title="Filter" onClickClose={onCloseModal} />
      <ModalBody>
        <Label>Place Types</Label>
        <FilterComponent
          onChangeFilterItems={onChangePlaceTypes}
          filterItems={localFilterObj.placeTypes}
          typeDict={cons.PLACE_TYPE_LIST}
        />

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_CAFE && (
            <SpecificForms>
              <Label>Filter for Cafes</Label>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_CAFE_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_WORKSPACE && (
            <SpecificForms>
              <Label>Filter for Work Spaces</Label>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_WORKSPACE_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}

        {localFilterObj.placeTypes.length === 1 &&
          localFilterObj.placeTypes[0] === cons.PLACE_TYPE_HOTEL && (
            <SpecificForms>
              <Label>Filter for Hotels</Label>
              <FilterComponent
                onChangeFilterItems={onChangeAvailability}
                filterItems={localFilterObj.availability}
                typeDict={cons.AVL_HOTEL_LIST}
                allowAllSelect
              />
            </SpecificForms>
          )}
      </ModalBody>
      <Footer>
        <CancelButton onClick={onClickClear}>Clear Filter</CancelButton>
        <SubmitButton onClick={onClickSearch}>Search</SubmitButton>
      </Footer>
    </Modal>
  );
};

const ModalBody = styled.div`
  ${ContainerStyleInside};
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

const Label = styled.div`
  ${HeaderSmall}
`;

const Footer = styled.div`
  ${ContainerStyleInside}
  display:flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

  ${forMobile(`
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-top: 2rem;
    `)}
`;
const CancelButton = styled.button`
  ${ButtonText};
  margin-right: 4rem;
`;
const SubmitButton = styled.button`
  ${ButtonBlackSmall};
`;

const SpecificForms = styled.div`
  ${AnimationSlideLeft};
  margin-top: 1rem;
`;