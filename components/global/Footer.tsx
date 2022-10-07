import React from "react";
import styled from "styled-components";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {
  width: string;
}

export const Footer: React.FC<Props> = ({ width }) => {
  return (
    <FooterWrapper>
      <PageContainer width={width}></PageContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div``;

const PageContainer = styled.div`
  ${ContainerStyle}
`;
