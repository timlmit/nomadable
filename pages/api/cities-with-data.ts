import { fetchPlacesWithFilter } from "./../../modules/api/fetchPlacesWithFilter";
import { PLACE_TYPE_CAFE } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { City, CityWithData } from "../../data/articles/cities";
import places from "./places";
import { initialFilterObj } from "../../redux/slices/placeSlice";
import { getAverage } from "../../modules/Math";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  //   const { userId } = req;
  const { cities } = req.body;

  try {
    const citiesWithData: CityWithData[] = [];
    let loopCnt = 0;

    while (citiesWithData.length < cities.length) {
      const city: City = cities[loopCnt];
      const places = await fetchPlacesWithFilter(
        req.mongoose,
        city.boundary,
        initialFilterObj,
        0,
        1000
      );

      const spotCnt = places.length;
      const placesWithSpeed = places.filter((place) => place.speedDown !== 0);
      const downSpeedArr = placesWithSpeed.map((place) => place.speedDown);
      const avgSpeed = downSpeedArr.length > 0 ? getAverage(downSpeedArr) : 0;
      citiesWithData.push({ ...city, spotCnt, avgSpeed });

      loopCnt += 1;
    }

    return res.status(200).json({ citiesWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
