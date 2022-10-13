import React from "react";
import styled from "styled-components";
import { ReviewWithData } from "../../../../redux/slices/placeSlice";

import * as cons from "../../../../constants";
import * as fs from "../../../../styles/styled-components/FontSize";
import {
  convertDateStrToReadable,
  generateDateText,
} from "../../../../modules/DateUtils";
import { ReviewStars } from "../../../app-commons/ReviewStars";
import { ButtonText } from "../../../../styles/styled-components/Buttons";

interface Props {
  reviewWithData: ReviewWithData;
  onClickEdit: (reviewId: string, stars: number, comment: string) => void;
}

export const ReviewItem: React.FC<Props> = ({
  reviewWithData,
  onClickEdit,
}) => {
  const rv = reviewWithData;

  return (
    <ReviewItemWrapper>
      <UserSection>
        <UserPicture src={rv.userPicture} />
        <UserInfo>
          <Name>{rv.userName}</Name>
          <PostDate>{generateDateText(new Date(rv.created))}</PostDate>
        </UserInfo>
        <StarsSection>
          <ReviewStars stars={rv.stars} />
        </StarsSection>
        {rv.myReview && (
          <EditButton
            onClick={() => onClickEdit(rv._id || "", rv.stars, rv.comment)}
          >
            Edit
          </EditButton>
        )}
      </UserSection>
      <CommentSection>{rv.comment}</CommentSection>
    </ReviewItemWrapper>
  );
};

const ReviewItemWrapper = styled.div`
  ${cons.FONT_COLOR_NORMAL};
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserPicture = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  object-fit: cover;
  border-radius: 10rem;
`;

const UserInfo = styled.div`
  margin-left: 1rem;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const PostDate = styled.div`
  ${fs.FontSizeSmall};
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: 400;
`;

const StarsSection = styled.div`
  font-size: 0.7rem;
  /* margin: 1rem 0 0.5rem 0; */
  margin-left: 1.2rem;
`;

const CommentSection = styled.div`
  font-weight: 300;
  margin-top: 0.8rem;
  line-height: 1.5em;
`;

const EditButton = styled.button`
  ${ButtonText};
  margin-left: 0.8rem;
  text-decoration: underline;
`;
