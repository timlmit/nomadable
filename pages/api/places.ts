import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";
import placeWithData from "./place-with-data";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  //   const { userId } = req;
  const { latStart, lngStart, latEnd, lngEnd } = req.query;

  try {
    const Place = req.mongoose.model("Place");

    // get place
    const places = await Place.find({
      spotLat: { $gte: latStart, $lte: latEnd },
      spotLng: { $gte: lngStart, $lte: lngEnd },
    })
      .sort({ testCnt: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({ places });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
