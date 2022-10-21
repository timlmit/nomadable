import { Boundary } from "../../data/articles/cities";
import { FilterObj, Place } from "../../redux/slices/placeSlice";

export const fetchPlacesWithFilter = async (
  mongoose: any,
  boundary: Boundary,
  filterObj: FilterObj,
  skip: number,
  limit: number
): Promise<Place[]> => {
  try {
    const Place = mongoose.model("Place");

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
      spotLat: { $gte: boundary.latStart, $lte: boundary.latEnd },
      spotLng: { $gte: boundary.lngStart, $lte: boundary.lngEnd },
      placeType: placeTypeFilter,
      availability: availabilityFilter,
    })
      .sort({ reviewStars: -1, testCnt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return places;
  } catch (err) {
    throw err;
  }
};
