import React from "react";
import styled from "styled-components";
import { PointEarnedNotification } from "../app-commons/PointEarnedNotification";
import { LoginModalContainer } from "../login/LoginModalContainer";

interface Props {}

export const GlobalModals: React.FC<Props> = ({}) => {
  return (
    <GlobalModalsWrapper>
      <LoginModalContainer />
      <PointEarnedNotification />
    </GlobalModalsWrapper>
  );
};

const GlobalModalsWrapper = styled.div``;
