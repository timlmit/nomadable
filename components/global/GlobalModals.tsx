import React from "react";
import styled from "styled-components";
import { LoginModalContainer } from "../login/LoginModalContainer";

interface Props {}

export const GlobalModals: React.FC<Props> = ({}) => {
  return (
    <GlobalModalsWrapper>
      <LoginModalContainer />
    </GlobalModalsWrapper>
  );
};

const GlobalModalsWrapper = styled.div``;
