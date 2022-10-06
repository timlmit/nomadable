import { getAverage } from "./../../modules/Math";
import { ERR_RECENT_CHECKIN } from "../../modules/ErrorCode";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import newPlace from "../new-place";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;

  const { speedDown, speedUp, placeId } = req.body;

  try {
    const Place = req.mongoose.model("Place");
    const CheckIn = req.mongoose.model("CheckIn");

    // if there is a recent checkin, block this request
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);
    const recentCheckIn = await CheckIn.findOne({
      userId,
      placeId,
      checkInTime: { $lt: dayAgo },
    });

    if (recentCheckIn) {
      return res.status(500).json({ message: ERR_RECENT_CHECKIN });
    }

    // create check in
    await CheckIn.create({
      userId,
      placeId,
      speedDown,
      speedUp,
      checkInTime: new Date(),
    });

    // update wifi speed of the place
    const checkIns = await CheckIn.find({
      placeId,
      speedDown: { $ne: null },
      speedUp: { $ne: null },
    }).lean();

    const averageSpeedDown = getAverage(
      checkIns.map((checkin: any) => checkin.speedDown)
    );
    const averageSpeedUp = getAverage(
      checkIns.map((checkin: any) => checkin.speedUp)
    );

    const updatedPlace = await Place.findOneAndUpdate(
      { id: placeId },
      {
        speedDown: averageSpeedDown,
        speedUp: averageSpeedUp,
        testCnt: checkIns.length,
      },
      { new: true }
    ).lean();

    const placeWithData = await makePlaceWithData(
      updatedPlace,
      userId,
      req.mongoose
    );

    return res.status(200).json({ placeWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
