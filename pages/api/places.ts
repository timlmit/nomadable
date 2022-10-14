import { PLACE_TYPE_CAFE } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  //   const { userId } = req;
  const { latStart, lngStart, latEnd, lngEnd, pageIndex, filterObj } = req.body;

  try {
    const Place = req.mongoose.model("Place");

    const placeTypeFilter =
      filterObj.placeTypes.length > 0
        ? { $in: filterObj.placeTypes }
        : { $exists: true };

    const availabilityFilter =
      filterObj.availability.length > 0
        ? { $all: filterObj.availability }
        : { $exists: true };

    // get place
    const places = await Place.find({
      spotLat: { $gte: latStart, $lte: latEnd },
      spotLng: { $gte: lngStart, $lte: lngEnd },
      placeType: placeTypeFilter,
      availability: availabilityFilter,
    })
      .sort({ reviewStars: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({ places });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
