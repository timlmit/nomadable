import React, { useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { Place } from "../../../redux/slices/placeSlice";
import { ButtonSecondarySmallest } from "../../../styles/styled-components/Buttons";
import { ContainerStyleInside } from "../../../styles/styled-components/Layouts";
import { Contributers } from "./Contributers";
import { Pagination } from "./Pagination";
import { HeaderSmall } from "../../../styles/styled-components/Texts";
import { PlaceItem } from "./PlaceItem";
import { AnimationSlideUp } from "../../../styles/styled-components/Animations";
import { SectionLoader } from "../../commons/SectionLoader";
import { useAppSelector } from "../../../redux/hooks";
import { selectApiFetchPlacesStatus } from "../../../redux/slices/api/apiPlaceSlice";
import { Contributer } from "../../../redux/slices/contributerSlice";

const HEADER_HEIGHT = 5;

interface Props {
  places: Place[];
  onChangePageIndex: (pageIndex: number) => void;
  width: number;
  selectedPlace: string;
  contributers: Contributer[];
}

export const SearchResult: React.FC<Props> = ({
  places,
  onChangePageIndex,
  width,
  selectedPlace,
  contributers,
}) => {
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);

  /**
   * Effect
   */
  useEffect(() => {
    const element = document.getElementById(`element_${selectedPlace}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedPlace]);

  /**
   * Render
   */

  return (
    <Wrapper>
      <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
      <Header width={width}>
        <PageTitle>{places.length} Cafes with WiFi</PageTitle>
        <FilterButton>Filter</FilterButton>
      </Header>
      <NotFixed>
        <ItemContainer>
          {places.length < 1 && (
            <NoResult>There is no search result in the area.</NoResult>
          )}
          {places.map((place) => (
            <PlaceWrapper key={place.id} id={`element_${place.id}`}>
              <PlaceItem
                place={place}
                selected={
                  selectedPlace === "" ? undefined : place.id === selectedPlace
                }
              />
            </PlaceWrapper>
          ))}
        </ItemContainer>

        <PaginationSection>
          <Pagination />
        </PaginationSection>

        <ContributersSection>
          <Contributers contributers={contributers} />
        </ContributersSection>
      </NotFixed>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${ContainerStyleInside};
  min-height: 100%;
  position: relative;
`;

const Header = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  position: fixed;
  top: ${HEADER_HEIGHT}rem;
  z-index: 1;
  width: ${(props) => props.width}rem;
  box-sizing: border-box;
  margin-left: -1.5rem;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
`;

// const Scroller = styled.div`
//   overflow-y: scroll;
// `;

const NotFixed = styled.div`
  padding-top: 6rem;
`;

const PageTitle = styled.div`
  ${HeaderSmall};
  margin: 0;
`;

const FilterButton = styled.button`
  ${ButtonSecondarySmallest};
  margin-left: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  min-height: 100%;

  /* gap: 0.5rem; */
`;

const NoResult = styled.div`
  margin-top: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeNormal};
`;

const PlaceWrapper = styled.div`
  width: calc(50% - 0.7rem);
`;

const PaginationSection = styled.div``;

const ContributersSection = styled.div``;
