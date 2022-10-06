import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";

interface Props {
  speed: number;
}

export const NetSpeedIndicator: React.FC<Props> = ({ speed }) => {
  const [color, setColor] = useState("");

  /**
   * Modules
   */

  const getColor = (_speed: number) => {
    if (_speed === 0) return cons.FONT_COLOR_LIGHTEST;
    if (_speed >= 50) return cons.COLOR_BLUE_2;
    if (_speed >= 30) return cons.COLOR_PRIMARY_1;
    if (_speed >= 8) return cons.COLOR_ORANGE_0;
    return cons.COLOR_RED_1;
  };

  /**
   * Effects
   */

  const updateColor = () => {
    const _color = getColor(speed);
    setColor(_color);
  };

  useEffect(() => {
    updateColor();
  }, [speed]);

  /**
   * Render
   */

  return (
    <Wrapper color={color}>
      <SpeedNumber>{speed}</SpeedNumber>
      <Unit>mbps</Unit>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string }>`
  width: 3.7em;
  height: 3.7em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: 0.15em solid ${(props) => props.color};
  & div {
    color: ${(props) => props.color};
  }
`;

const SpeedNumber = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const Unit = styled.div`
  font-size: 0.6em;
  font-weight: 400;
`;
