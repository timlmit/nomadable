import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import {
  FormLabelStyle,
  FormStyle,
} from "../../styles/styled-components/Forms";

interface Props {
  label: string;
  value: string;
  placeholder: string;
  width?: string;
  textArea?: boolean;
  onChange: (e: any) => void;
}

export const FormSet: React.FC<Props> = (props) => {
  return (
    <FormSetWrapper width={props.width}>
      <FormLabelStyle>{props.label}</FormLabelStyle>

      {props.textArea ? (
        <Textarea
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      ) : (
        <Form
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      )}
    </FormSetWrapper>
  );
};

const FormSetWrapper = styled.div<{ width?: string }>`
  width: ${(props) => props.width || "100%"};
`;

const Form = styled.input`
  ${FormStyle}
`;

const Textarea = styled.textarea`
  ${FormStyle}
`;
