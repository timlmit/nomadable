import styled, { css } from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";

export const HeaderSmall = css`
  ${fs.FontSizeSemiLarge};
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 1em;
  margin-bottom: 1em;
`;

export const Paragraph = css`
  ${fs.FontSizeNormal}
  line-height: 1.4em;
  font-weight: 400;
  color: ${cons.FONT_COLOR_SECONDARY};
  margin-bottom: 1em;
  /* color: ${cons.FONT_COLOR_LIGHT}; */
`;

export const Bold = styled.span<{ color?: string }>`
  font-weight: bold;
  color: ${(props) => props.color};
`;
