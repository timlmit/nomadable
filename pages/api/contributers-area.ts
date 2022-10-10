import nextConnect from "next-connect";

import { ERR_LOGIN_FAIL } from "./../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Contributer } from "../../redux/slices/contributerSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Functions
 */

const makeContributers = (pointSums: any[], users: any): Contributer[] => {
  const contributers: Contributer[] = pointSums.map((pointSum: any) => {
    const user: any = users.find((user: any) => {
      return user._id.toString() === pointSum._id;
    });
    return {
      userId: user ? user._id : "",
      name: user ? user.name : "",
      picture: user ? user.picture : "",
      description: user ? user.description : "",
      point: pointSum.total,
    };
  });
  return contributers;
};

/**
 * Main
 */

handler.get(async (req: any, res: any) => {
  const placeIds = req.query["placeIds[]"];

  try {
    const User = req.mongoose.model("User");
    const Point = req.mongoose.model("Point");

    if (!placeIds) {
      return res.status(200).json({ contributers: [] });
    }

    // make contributers
    const pointSums = await Point.aggregate([
      {
        $match: {
          placeId: { $in: placeIds },
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
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const userIds = pointSums.map((pointSum: any) => pointSum._id);
    const users = await User.find({ _id: userIds }).lean();

    const contributers = makeContributers(pointSums, users);

    return res.status(200).json({ contributers });
  } catch (error: any) {
    return res.status(500).json(ERR_LOGIN_FAIL);
  }
});

export default handler;