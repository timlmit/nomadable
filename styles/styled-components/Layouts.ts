import { WIDTH_TABLET } from "./../../constants";
import { css } from "styled-components";
import { forMobile } from "../Responsive";

export const ContainerStyle = css<{ width: number }>`
  width: 100%;
  max-width: ${(props) => props.width}px;
  margin: auto;
  padding: 0 2rem;
  box-sizing: border-box;

  ${forMobile(`
    padding: 0 1rem;
  `)}
`;

export const ContainerStyleInside = css`
  width: 100%;
  margin: auto;
  padding: 0 1.5rem;
  box-sizing: border-box;

  ${forMobile(`
    padding: 0 1rem;
  `)}
`;