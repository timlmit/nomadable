import {
  getPointPlan,
  POINT_TYPE_BE_CHECKED_IN,
  POINT_TYPE_CHECK_IN,
} from "./../../constants";
import { getAverage } from "./../../modules/Math";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Function
 */

const updateWifiSpeedOfPlace = async (
  Place: any,
  CheckIn: any,
  placeId: string
) => {
  try {
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
        speedDown: Math.round(averageSpeedDown),
        speedUp: Math.round(averageSpeedUp),
        testCnt: checkIns.length,
      },
      { new: true }
    ).lean();

    return updatedPlace;
  } catch (err) {
    throw err;
  }
};

const distributePoints = async (
  Point: any,
  checkInUser: string,
  discoveredBy: string,
  referenceId: string
) => {
  const addingPoint = getPointPlan(POINT_TYPE_CHECK_IN);

  // send points to check in user
  await Point.create({
    userId: checkInUser,
    timestamp: Date.now(),
    point: addingPoint,
    type: POINT_TYPE_CHECK_IN,
    referenceId,
  });

  // send points to discoverer user
  await Point.create({
    userId: discoveredBy,
    timestamp: Date.now(),
    point: getPointPlan(POINT_TYPE_BE_CHECKED_IN),
    type: POINT_TYPE_BE_CHECKED_IN,
    referenceId,
  });

  // get totalt point of user
  const totalPoint = await Point.aggregate([
    {
      $match: {
        userId: checkInUser,
      },
    },
    {
      $group: {
        _id: "$userId",
        total: {
          $sum: "$point",
        },
      },
    },
  ]);

  return { addingPoint, totalPoint: totalPoint[0].total };
};

/**
 * Main
 */

handler.post(async (req: any, res: any) => {
  const { userId } = req;

  const { speedDown, speedUp, placeId } = req.body;

  try {
    const Place = req.mongoose.model("Place");
    const CheckIn = req.mongoose.model("CheckIn");
    const Point = req.mongoose.model("Point");

    // create check in
    const checkin = await CheckIn.create({
      userId,
      placeId,
      speedDown,
      speedUp,
      checkInTime: new Date(),
    });

    // update wifi speed of the place
    const updatedPlace = await updateWifiSpeedOfPlace(Place, CheckIn, placeId);

    const placeWithData = await makePlaceWithData(
      updatedPlace,
      userId,
      req.mongoose
    );

    // distribute points
    const { addingPoint, totalPoint } = await distributePoints(
      Point,
      userId,
      updatedPlace.discoveredBy,
      checkin._id
    );

    return res.status(200).json({ placeWithData, addingPoint, totalPoint });
  } catch (error: any) {
    console.log(
      "🚀 ~ file: check-in.ts ~ line 146 ~ handler.post ~ error",
      error
    );
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
