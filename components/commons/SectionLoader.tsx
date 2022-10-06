import React from "react";
import styled from "styled-components";

import Loader from "./Loader";

interface Props {
  visible: boolean;
}

export const SectionLoader: React.FC<Props> = ({ visible }) => {
  return (
    <PageLoaderWrapper visible={visible}>
      <Loader color="#aaa" />
    </PageLoaderWrapper>
  );
};

const PageLoaderWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;

  ${(props) =>
    props.visible &&
    `
        pointer-event: none;
        display:flex;
    `};
`;
