import React from "react";
import styled from "styled-components";
import { isDataView } from "util/types";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { FormStyle } from "../../styles/styled-components/Forms";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  ids: string[];
  texts: string[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const Selection: React.FC<Props> = (props) => {
  const handleChange = (event: any) => {
    props.onChange(event.target.value);
  };

  return (
    <SelectionWrapper onChange={handleChange}>
      {props.ids.map((id, index) => {
        return (
          <Option key={id} value={id} selected={props.selectedId === id}>
            {props.texts[index]}
          </Option>
        );
      })}
    </SelectionWrapper>
  );
};

const SelectionWrapper = styled.select`
  ${ClickableStyle}
  ${FormStyle}
  width: 12rem;
  /* height: 3rem; */
  padding: 0.7rem 0.7rem;
`;

const Option = styled.option``;
