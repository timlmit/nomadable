import { POINT_TYPE_REVIEW } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";
import { distributePointsGeneral } from "../../modules/api/addPoint";
import { Review } from "../../redux/slices/placeSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { reviewId, isUpvote, clearVote } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    // update review
    const review = await Review.findOne({ _id: reviewId });

    review.upVoters = review.upVoters.filter(
      (voter: string) => voter !== userId
    );

    review.downVoters = review.downVoters.filter(
      (voter: string) => voter !== userId
    );

    if (!clearVote) {
      if (isUpvote) {
        review.upVoters.push(userId);
      } else {
        review.downVoters.push(userId);
      }
    }

    review.voteScore = review.upVoters.length - review.downVoters.length;

    await review.save();

    const [reviewWithData] = await makeReviewsWithData(req.mongoose, [
      review._doc,
    ]);

    return res.status(200).json({ reviewWithData });
  } catch (error: any) {
    console.log('error', error);
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
