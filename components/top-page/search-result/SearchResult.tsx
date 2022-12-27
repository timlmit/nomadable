import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { FilterObj, Place } from "../../../redux/slices/placeSlice";
import {
  ButtonSecondarySmall,
  ButtonSecondarySmallest,
} from "../../../styles/styled-components/Buttons";
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
import { FilterModal } from "./FilterModal";
import { forMobile } from "../../../styles/Responsive";

const HEADER_HEIGHT = 5;

interface Props {
  places: Place[];
  onChangePageIndex: (pageIndex: number) => void;
  width: number;
  selectedPlace: string;
  contributers: Contributer[];
  // onChangeFilterObj: (filterObj: FilterObj) => void;
  filterObj: FilterObj;
  // filterVisible: boolean;
  onChangeFilterVisible: (visible: boolean) => void;
  searchResultTotalCnt: number;
  onHoverPlace: (placeId: string) => void;
}

export const SearchResult: React.FC<Props> = ({
  places,
  onChangePageIndex,
  width,
  selectedPlace,
  contributers,
  // onChangeFilterObj,
  filterObj,
  // filterVisible,
  onChangeFilterVisible,
  searchResultTotalCnt,
  onHoverPlace,
}) => {
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);
  // const [filterVisible, setFilterVisible] = useState(false);

  const onClickFilterButton = () => {
    onChangeFilterVisible(true);
  };

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

  const renderFilterCount = () => {
    let filterCnt = 0;

    if (filterObj.placeTypes.length > 0) filterCnt += 1;
    if (filterObj.availability.length > 0) filterCnt += 1;
    if (filterObj.saved) filterCnt += 1;

    if (filterCnt < 1) return null;
    return <FilterCnt>{filterCnt}</FilterCnt>;
  };

  return (
    <Wrapper>
      <SectionLoader visible={apiStatus.status === cons.API_LOADING} />
      <Header width={width}>
        <PageTitle>{searchResultTotalCnt} Places with WiFi</PageTitle>
        <FilterButton onClick={onClickFilterButton}>
          <FilterIcon src="/icon/filter-black3.svg" />
          Filter
          {renderFilterCount()}
        </FilterButton>
      </Header>
      <NotFixed>
        <ItemContainer>
          {places.length < 1 && (
            <NoResult>There is no search result in the area.</NoResult>
          )}
          {places.map((place) => (
            <PlaceWrapper
              key={place.id}
              id={`element_${place.id}`}
              onMouseEnter={() => {
                onHoverPlace(place.id);
              }}
              onMouseLeave={() => {
                onHoverPlace("");
              }}
            >
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
  margin-left: -2rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

  ${forMobile(`
  display:none;
  `)}
`;

// const Scroller = styled.div`
//   overflow-y: scroll;
// `;

const NotFixed = styled.div`
  padding-top: 6rem;
  ${forMobile(`
      padding-top: 2rem;
  `)}
`;

const PageTitle = styled.div`
  ${HeaderSmall};
  margin: 0;
`;

const FilterButton = styled.button`
  ${ButtonSecondarySmallest};
  margin-left: 2rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const FilterCnt = styled.div`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  margin-left: 0.4rem;
  background-color: ${cons.COLOR_RED_3};
  background-color: ${cons.FONT_COLOR_SECONDARY};
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  ${fs.FontSizeSemiSmall}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* box-shadow: ${cons.SHADOW_0}; */
  font-weight: bold;
`;

const FilterIcon = styled.img`
  opacity: 0.5;
  width: 1.1rem;
  margin-right: 0.6rem;
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

  ${forMobile(`
    width: 100%;
  `)}
`;

const PaginationSection = styled.div``;

const ContributersSection = styled.div``;
