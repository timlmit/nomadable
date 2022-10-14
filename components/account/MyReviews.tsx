import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Review, ReviewWithPlaceData } from "../../redux/slices/placeSlice";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  reviews: ReviewWithPlaceData[];
  fetchMore: () => void;
}

export const MyReviews: React.FC<Props> = ({ reviews, fetchMore }) => {
  return (
    <MyReviewsWrapper>
      {reviews.map((r) => `${r.spotName} - ${r.comment}`)}
      <button onClick={fetchMore}>more</button>
    </MyReviewsWrapper>
  );
};

const MyReviewsWrapper = styled.div``;
