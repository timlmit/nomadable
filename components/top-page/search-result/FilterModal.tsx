import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { FilterObj, initialFilterObj } from "../../../redux/slices/placeSlice";
import {
  ButtonBlackSmall,
  ButtonText,
} from "../../../styles/styled-components/Buttons";
import { FormLabelStyle } from "../../../styles/styled-components/Forms";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { Modal } from "../../commons/Modal";
import { ModalHeader } from "../../commons/ModalHeader";
import { PlaceTypeFilter } from "./filters/PlaceTypeFiilter";

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

  const onCloseModal = () => {
    setFilterObj(filterObj);
    closeModal();
  };

  const onChangePlaceTypes = (placeTypes: string[]) => {
    setFilterObj({ ...localFilterObj, placeTypes });
  };

  const onClickClear = () => {
    setFilterObj(initialFilterObj);
  };

  const onClickSearch = () => {
    onClickFilterSave(localFilterObj);
    closeModal();
  };

  return (
    <Modal visible={visible} closeModal={onCloseModal} width="38rem">
      <ModalHeader title="Filter" onClickClose={onCloseModal} />
      <ModalBody>
        <Label>Place Types</Label>
        <PlaceTypeFilter
          onChangePlaceTypes={onChangePlaceTypes}
          placeTypes={localFilterObj.placeTypes}
        />
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
  padding-top: 0.5rem;
  padding-bottom: 2rem;
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
`;
const CancelButton = styled.button`
  ${ButtonText};
  margin-right: 4rem;
`;
const SubmitButton = styled.button`
  ${ButtonBlackSmall};
`;
