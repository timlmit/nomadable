import { fetchPlacesWithFilter } from "./../../modules/api/fetchPlacesWithFilter";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Article, ArticleWithData } from "../../data/articles/articles";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";
import { APP_URL, STATUS_PERM_CLOSE } from "../../constants";
import { Place, SitemapLink } from "../../redux/slices/placeSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  try {
    const Place = req.mongoose.model("Place");

    const places = await Place.find({
      status: { $ne: STATUS_PERM_CLOSE },
    })
      .select("id spotName")
      .sort({ testCnt: -1 })
      .lean();

    const placeLinks: SitemapLink[] = places.map((place: Place) => ({
      text: place.spotName,
      url: `${APP_URL}/place/${place.id}`,
    }));

    return res.status(200).json({ placeLinks });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
