import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";

interface Props {
  onChange: (placeType: string) => void;
  placeType: string;
}

export const PlaceTypeForm: React.FC<Props> = ({ onChange, placeType }) => {
  return (
    <PlaceTypeFormWrapper>
      {cons.PLACE_TYPE_LIST.map((type) => {
        return (
          <PlaceTypeItem
            key={type}
            onClick={() => onChange(type)}
            active={type === placeType}
          >
            <PlaceTypeEmoji>{cons.EMOJIS_PLACE_TYPE[type]}</PlaceTypeEmoji>

            {type}
          </PlaceTypeItem>
        );
      })}
    </PlaceTypeFormWrapper>
  );
};

const PlaceTypeFormWrapper = styled.div`
  display: flex;
`;

const PlaceTypeItem = styled.div<{ active: boolean }>`
  ${ClickableStyle}
  padding: 0.6rem 1.2rem;
  border: 0.1rem solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.3rem;
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};
  margin-right: 0.8rem;
  display: flex;
  align-items: center;

  ${(props) =>
    props.active &&
    `
    border: 0.1rem solid ${cons.COLOR_ERROR_2};
    color: ${cons.COLOR_ERROR_0};
    background-color: ${cons.COLOR_ERROR_6}
  `};
`;

const PlaceTypeEmoji = styled.div`
  margin-right: 0.6rem;
  font-size: 1.2rem;
`;
