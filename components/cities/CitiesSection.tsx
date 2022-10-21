import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CityWithData } from "../../data/articles/cities";
import * as fs from "../../styles/styled-components/FontSize";
import { CityItem } from "./CityItem";

interface Props {
  citiesWithData: CityWithData[];
}

export const CitiesSection: React.FC<Props> = ({ citiesWithData }) => {
  return (
    <CitiesSectionWrapper>
      <Title>Find Places to Work From</Title>
      <Container>
        {citiesWithData.map((ct) => (
          <CityItem key={ct.slug} cityWithData={ct} />
        ))}
      </Container>
    </CitiesSectionWrapper>
  );
};

const CitiesSectionWrapper = styled.div``;

const Title = styled.div`
  ${fs.FontSizeHeaderLarge};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`;
