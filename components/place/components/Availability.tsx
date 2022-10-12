import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";

interface Props {
  availability: string[];
}

export const Availability: React.FC<Props> = ({ availability }) => {
  return (
    <AvailabilityWrapper>
      {availability.map((a) => (
        <AvailabilityItem key={a}>
          <ItemIcon>{cons.AVL_ALL_LIST[a].icon}</ItemIcon>
          {cons.AVL_ALL_LIST[a].text}
        </AvailabilityItem>
      ))}
    </AvailabilityWrapper>
  );
};

const AvailabilityWrapper = styled.div`
  margin-top: 1.8rem;
  display: flex;
  gap: 1.4rem;
`;

const AvailabilityItem = styled.span`
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding: 0.7rem 1.5rem;
  ${fs.FontSizeSemiSmall}
  font-weight: 600;
  border-radius: 0.3rem;
  color: ${cons.FONT_COLOR_NORMAL};
  display: inline-flex;
  align-items: center;
`;

const ItemIcon = styled.span`
  margin-right: 0.8rem;
  margin-left: -0.5rem;
  font-size: 1.2em;
`;
