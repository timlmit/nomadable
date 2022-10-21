import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CardBoaderCss } from "../../styles/styled-components/Card";
import * as fs from "../../styles/styled-components/FontSize";
import { Header3, Header4 } from "../../styles/styled-components/Texts";

interface Props {
  image: string;
  title: string;
}

export const CardWithImage: React.FC<Props> = ({ image, title }) => {
  return (
    <Card>
      <HeadImage src={image} />
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Card>
  );
};

const Card = styled.div`
  ${CardBoaderCss};
  border-radius: 0.7rem;
  overflow: hidden;
  width: 16rem;
  height: 18rem;
`;

const HeadImage = styled.img`
  height: 10rem;
  width: 100%;
`;

const TitleWrapper = styled.div`
  padding: 1rem 1rem 1.5rem 1rem;
`;

const Title = styled.div`
  ${Header3};
  /* font-weight: 600; */
`;
