import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { userId } = req;
  const { placeId } = req.query;

  try {
    const Place = req.mongoose.model("Place");
    const User = req.mongoose.model("User");

    // get place
    const place = await Place.findOne({
      id: placeId,
    }).lean();

    if (!place) throw Error;

    // get discoverer
    const placeWithData = await makePlaceWithData(place, userId, req.mongoose);

    return res.status(200).json({ placeWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
