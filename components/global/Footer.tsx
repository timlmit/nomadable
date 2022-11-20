import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as fs from "../../styles/styled-components/FontSize";
import {
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_NORMAL,
  FONT_COLOR_SUPER_LIGHT,
} from "../../constants";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {
  width: string;
  height: string;
}

export const Footer: React.FC<Props> = ({ width, height }) => {
  return (
    <FooterWrapper height={height}>
      <PageContainer width={width}>
        <FooterContents>
          <Trademark>{`© ${new Date().getFullYear()} Nomadable`}</Trademark>
          <Dot>&#x2022;</Dot>
          <Link href="/sitemap" passHref>
            <a>Sitemap</a>
          </Link>
          <Dot>&#x2022;</Dot>
          <a href="mailto:yuya.uzu@gmail.com">Contact</a>
        </FooterContents>
      </PageContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div<{ height: string }>`
  ${(props) => `height: ${props.height};`};
  border-top: 1px solid ${FONT_COLOR_SUPER_LIGHT};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PageContainer = styled.div`
  ${ContainerStyle}
`;

const FooterContents = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
  ${fs.FontSizeSemiSmall}

  & a {
    /* text-transform: uppercase; */
    color: ${FONT_COLOR_NORMAL};
  }
`;

const Trademark = styled.div`
  /* margin-right: 1rem; */
`;

const Dot = styled.div`
  color: ${FONT_COLOR_LIGHTEST};
  margin: 0 0.5rem;
`;
