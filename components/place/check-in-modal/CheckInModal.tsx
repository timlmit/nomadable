import React, { useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import {
  ContainerStyle,
  ContainerStyleInside,
} from "../../../styles/styled-components/Layouts";
import { Modal } from "../../commons/Modal";
import { ModalHeader } from "../../commons/ModalHeader";
import { LocationVerification } from "./LocationVerification";
import { WifiSpeedTest } from "./WifiSpeedTest";

interface Props {
  visible: boolean;
  onClose: () => void;
  spotLat: number | null;
  spotLng: number | null;
  onCheckIn: (speedDown: number, speedUp: number) => void;
}

export const CheckInModal: React.FC<Props> = (props) => {
  const [pageIndex, setPageIndex] = useState(1);

  /**
   * User Interface
   */

  const onVerified = () => {
    setPageIndex(2);
  };

  const onFinishTest = (speedDown: number, speedUp: number) => {
    props.onCheckIn(speedDown, speedUp);
    setTimeout(() => {
      setPageIndex(1);
    }, 1000);
  };

  /**
   * Render
   */

  const renderModalContents = () => {
    if (props.spotLat === null || props.spotLng === null) return;

    if (pageIndex === 1) {
      return (
        <LocationVerification
          onVerified={onVerified}
          spotLat={props.spotLat}
          spotLng={props.spotLng}
        />
      );
    }
    return <WifiSpeedTest onFinishTest={onFinishTest} />;
  };

  return (
    <Modal visible={props.visible} closeModal={props.onClose} width="28rem">
      <ModalHeader
        title={`Check In & Test WiFi (${pageIndex}/2)`}
        onClickClose={props.onClose}
      />
      <ModalContainer>{renderModalContents()}</ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  ${ContainerStyleInside}
`;
