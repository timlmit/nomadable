import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { forMobile } from "../../../styles/Responsive";
import { HideScrollBarCss } from "../../../styles/styled-components/StyleUtils";

interface Props {
  images: string[];
}

export const SpotImages: React.FC<Props> = ({ images }) => {
  return (
    <SpotImagesWrapper>
      <Scroller>
        <LargeImageSection>
          <LargeImage src={images[0]} />
        </LargeImageSection>
        <SmallImageSection>
          <SmallImage src={images[1]} />
          <SmallImage src={images[2]} />
          <SmallImage src={images[3]} />
          <SmallImage src={images[4]} />
        </SmallImageSection>
      </Scroller>
    </SpotImagesWrapper>
  );
};

const FLEX_GAP = 0.4;

const SpotImagesWrapper = styled.div`
  height: 28rem;
  border-radius: 0.8rem;
  overflow: hidden;

  ${forMobile(`
    height: 14rem;
    overflow-x: scroll;
    ${HideScrollBarCss}
  `)}
`;

const Scroller = styled.div`
  height: 100%;
  display: flex;
  gap: ${FLEX_GAP}rem;
  width: 100%;
  position: relative;

  ${forMobile(`
    width: 180%;
  `)}
`;

const LargeImageSection = styled.div`
  width: calc(50% - ${FLEX_GAP}rem);

  ${forMobile(`
    width: 100%;
`)}
`;

const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SmallImageSection = styled.div`
  width: calc(50%);
  display: flex;
  flex-wrap: wrap;
  gap: ${FLEX_GAP}rem;

  ${forMobile(`
    width: 100%;
  `)}
`;

const SmallImage = styled.img`
  width: calc(50% - ${FLEX_GAP / 2}rem);
  object-fit: cover;
`;