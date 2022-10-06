import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import * as tx from "../../../styles/styled-components/Texts";

export const Title = styled.div`
  ${tx.HeaderSmall}
  margin-top: 1.8rem;
`;

export const Description = styled.div`
  ${tx.Paragraph};
  margin-bottom: 1.8rem;
`;

export const Footer = styled.div`
  padding: 2rem 0;
`;
