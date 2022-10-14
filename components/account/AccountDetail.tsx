import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import places from "../../pages/api/places";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchDiscoveredPlaces,
  initApiFetchDiscoveredPlacesState,
  selectApiFetchDiscoveredPlacesStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  apiFetchReviews,
  selectApiFetchReviewsStatus,
} from "../../redux/slices/api/apiReviewSlice";
import { Place } from "../../redux/slices/placeSlice";
import {
  selectDiscoveredPlaces,
  selectUserReviews,
} from "../../redux/slices/userSlice";
import { MyDiscoveredPlaces } from "./DiscoveredPlaces";
import { MyReviews } from "./MyReviews";

interface Props {
  userId: string;
}

const TAB_DISCOVERED = "discovered";
const TAB_REVIEWS = "reviews";

export const AccountDetail: React.FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  // store
  const apiStatusDiscovered = useAppSelector(
    selectApiFetchDiscoveredPlacesStatus
  );
  const discoveredPlaces = useAppSelector(selectDiscoveredPlaces);
  const apiStatusReviews = useAppSelector(selectApiFetchReviewsStatus);
  const reviews = useAppSelector(selectUserReviews);
  // local state
  const [activeTab, setActiveTab] = useState(TAB_DISCOVERED);

  /**
   * API Calls
   */

  const fetchDiscovered = () => {
    dispatch(
      apiFetchDiscoveredPlaces({
        userId,
        loadedCnt: discoveredPlaces.length,
        loadingCnt: 15,
      })
    );
  };

  const fetchReviews = () => {
    dispatch(
      apiFetchReviews({
        userId,
        loadedCnt: reviews.length,
        loadingCnt: 15,
      })
    );
  };

  /**
   * User Interfaces
   */

  /**
   * Effect
   */

  useEffect(() => {
    if (
      activeTab === TAB_DISCOVERED &&
      apiStatusDiscovered.status === cons.API_IDLE
    ) {
      fetchDiscovered();
    } else if (
      activeTab === TAB_REVIEWS &&
      apiStatusReviews.status === cons.API_IDLE
    ) {
      fetchReviews();
    }
  }, [activeTab]);

  /**
   * Render
   */

  const renderContent = () => {
    if (activeTab === TAB_DISCOVERED) {
      return (
        <MyDiscoveredPlaces
          places={discoveredPlaces}
          fetchMore={fetchDiscovered}
        />
      );
    }
    return <MyReviews reviews={reviews} fetchMore={fetchReviews} />;
  };

  return (
    <AccountDetailWrapper>
      <Navigator>
        <NavItem onClick={() => setActiveTab(TAB_DISCOVERED)}>
          Discovered
        </NavItem>
        <NavItem onClick={() => setActiveTab(TAB_REVIEWS)}>Reviews</NavItem>
      </Navigator>
      {renderContent()}
    </AccountDetailWrapper>
  );
};

const AccountDetailWrapper = styled.div``;

const Navigator = styled.div``;

const NavItem = styled.button``;
