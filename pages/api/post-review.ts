import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { placeId, stars, comment } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    const review = await Review.findOneAndUpdate(
      { placeId, userId },
      {
        placeId,
        userId,
        stars: stars > 5 ? 5 : stars,
        comment,
      },
      { new: true, upsert: true }
    ).lean();

    const [reviewWithData] = await makeReviewsWithData(
      req.mongoose,
      [review],
      userId
    );

    const reviewStars = await updateReviewStarsOfPlace(req.mongoose, placeId);

    return res.status(200).json({ reviewWithData, reviewStars });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
