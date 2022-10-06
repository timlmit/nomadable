import React, { ReactNode } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

import { selectAuthenticated, selectUser } from "../../redux/slices/userSlice";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import { Footer } from "../global/Footer";
import { Header } from "../header/Header";

interface Props {
  width: number;
  children: ReactNode;
  bgColor?: string;
}

export const Layout: React.FC<Props> = ({ width, children, bgColor }) => {
  const authenticated = useAppSelector(selectAuthenticated);
  const user = useAppSelector(selectUser);

  return (
    <PageWrapper bgColor={bgColor}>
      <Header user={user} width={width} authenticated={authenticated} />
      <PageContainer width={width}>{children}</PageContainer>
      <Footer width={width} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor};
  min-height: 100vh;
`;

const PageContainer = styled.div`
  ${ContainerStyle}
`;
