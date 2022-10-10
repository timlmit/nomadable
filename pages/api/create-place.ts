import { ERR_PLACE_EXISTS } from "./../../modules/ErrorCode";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { getPlacePhotos } from "../../modules/api/getPlacePhotos";
import { Place } from "../../redux/slices/placeSlice";
import { getUniqueSlug } from "../../modules/api/getUniqueSlug";
import { addNewEvent } from "../../modules/api/addNewEvent";

const PLACE_ID = "place_id";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100mb",
//     },
//   },
// };

const getPlaceDetail = async (placeId: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/details/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `place_id=${placeId}`;
    const LANG = "language=en";
    const ITEMS = "fields=photos";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}&${ITEMS}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const place: Place = req.body.place;

  try {
    const Place = req.mongoose.model("Place");

    const existingPlace = await Place.findOne({
      googlePlaceId: place.googlePlaceId,
    });

    if (existingPlace) {
      return res
        .status(500)
        .json({ message: ERR_PLACE_EXISTS, placeId: existingPlace.id });
    }

    // const placeId = await getNextSequence(req.mongoose, PLACE_ID);
    const placeId = await getUniqueSlug(Place, place.spotName, "id");

    /**
     * Update Photos
     */
    const data = await getPlaceDetail(place.googlePlaceId);

    const photoReferences = data.result.photos.map(
      (p: any) => p.photo_reference
    );

    const imageUrls = await getPlacePhotos(photoReferences.slice(0, 5));

    // create post

    const newPlace = await Place.create({
      ...place,
      id: placeId,
      discoveredBy: userId,
      images: imageUrls,
      thumbnail: imageUrls[0],
    });

    if (!newPlace) throw Error;

    await addNewEvent(req.mongoose, {
      userId,
      title: "has discovered a new place 🆕",
      timestamp: Date.now(),
      placeId: newPlace.id,
      body: "",
      isOfficial: false,
    });

    return res.status(200).json({ placeId: newPlace.id });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
