import React from "react";
import styled from "styled-components";
import { Layout } from "../../components/commons/Layout";
import { NewPlace } from "../../components/new-place/NewPlace";
import {
  CONTAINER_WIDTH_NARROW,
  CONTAINER_WIDTH_WIDE,
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_SUPER_LIGHT,
} from "../../constants";

interface Props {}

const NewPlaceContainer: React.FC<Props> = ({}) => {
  return (
    <NewPlaceContainerWrapper>
      <Layout width={CONTAINER_WIDTH_NARROW}>
        <NewPlace />
      </Layout>
    </NewPlaceContainerWrapper>
  );
};

const NewPlaceContainerWrapper = styled.div`
  background-color: ${FONT_COLOR_SUPER_LIGHT};
`;

export default NewPlaceContainer;
