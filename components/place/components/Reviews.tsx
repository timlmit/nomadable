import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { useAppDispatch } from "../../../redux/hooks";
import { Review, ReviewWithData } from "../../../redux/slices/placeSlice";
import {
  openEditReviewForm,
  openNewReviewForm,
} from "../../../redux/slices/reviewFormSlice";
import {
  ButtonSecondarySmall,
  ButtonSecondarySmallest,
} from "../../../styles/styled-components/Buttons";
import { ReviewForm } from "./review/ReviewForm";
import { ReviewItem } from "./review/ReviewItem";
import { ReviewScore } from "./review/ReviewScore";

interface Props {
  reviewsWithData: ReviewWithData[];
  reviewStars: number;
  placeId: string;
}

export const Reviews: React.FC<Props> = ({
  reviewsWithData,
  reviewStars,
  placeId,
}) => {
  const dispatch = useAppDispatch();

  const showNewReviewForm = () => {
    dispatch(openNewReviewForm({ placeId }));
  };

  const onClickEdit = (reviewId: string, stars: number, comment: string) => {
    dispatch(openEditReviewForm({ reviewId, placeId, stars, comment }));
  };

  return (
    <ReviewsWrapper>
      {!reviewsWithData.map((r) => r.myReview).includes(true) && (
        <AddReviewButton onClick={showNewReviewForm}>
          + Add Review
        </AddReviewButton>
      )}
      <ReviewScoreSection>
        <ReviewScore stars={reviewStars} reviewCnt={reviewsWithData.length} />
      </ReviewScoreSection>
      {reviewsWithData.length > 0 && (
        <ReviewItems>
          {reviewsWithData.map((reviewWithData) => (
            <ReviewItem
              key={reviewWithData._id}
              reviewWithData={reviewWithData}
              onClickEdit={onClickEdit}
            />
          ))}
        </ReviewItems>
      )}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  position: relative;
  padding-top: 0.5rem;
`;

const ReviewScoreSection = styled.div`
  /* margin-top: 2rem; */
`;

const ReviewFormSection = styled.div``;

const ReviewItems = styled.div`
  margin-top: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const AddReviewButton = styled.button`
  ${ButtonSecondarySmallest};
  border-radius: 10rem;
  position: absolute;
  top: -3.55rem;
  left: 7rem;
`;
