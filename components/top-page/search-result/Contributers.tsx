import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { Contributer } from "../../../redux/slices/contributerSlice";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { SectionLoader } from "../../commons/SectionLoader";
import { useAppSelector } from "../../../redux/hooks";
import { selectApiFetchContributersAreaStatus } from "../../../redux/slices/api/apiUserSlice";

interface Props {
  contributers: Contributer[];
}

export const Contributers: React.FC<Props> = ({ contributers }) => {
  const apiStatus = useAppSelector(selectApiFetchContributersAreaStatus);

  /**
   * Render
   */
  if (contributers.length < 1) return null;

  return (
    <ContributersWrapper>
      <Label>Top Contributers in the Area</Label>
      <Card>
        <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
        {contributers.map(({ userId, name, picture, description, point }) => {
          return (
            <ItemWrapper key={userId}>
              <Picture>
                <PictureImg src={picture} />
              </Picture>
              <Info>
                <Name>{name}</Name>
                <Description>{description}</Description>
              </Info>
              <Point>
                <PointNumber>{point}</PointNumber>pts
              </Point>
            </ItemWrapper>
          );
        })}
      </Card>
    </ContributersWrapper>
  );
};

const ContributersWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  margin-bottom: 3rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Label = styled.div`
  ${HeaderSmall};
  margin-top: 2rem;
`;
const Card = styled.div`
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.8rem;
  padding: 0.8rem 1.5rem;
  position: relative;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 0;
  box-sizing: border-box;
`;

const Picture = styled.div`
  width: 3.2rem;
`;

const PictureImg = styled.img`
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  padding-left: 1rem;
`;

const Name = styled.div`
  ${fs.FontSizeNormal};
  font-weight: bold;
`;

const Description = styled.div`
  ${fs.FontSizeSemiSmall};
  margin-top: 0.1rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const Point = styled.div`
  ${fs.FontSizeSemiSmall};
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
`;

const PointNumber = styled.span`
  /* ${fs.FontSizeSemiLarge}; */
  margin-right: 0.3rem;
  /* font-weight: bold; */
  /* color: ${cons.FONT_COLOR_NORMAL}; */
`;
