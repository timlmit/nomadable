import { STATUS_OPEN } from "./../../constants";
import { Boundary } from "../../data/articles/cities";
import { FilterObj, Place } from "../../redux/slices/placeSlice";

export const fetchPlacesWithFilter = async (
  mongoose: any,
  userId: string,
  boundary: Boundary | null,
  filterObj: FilterObj,
  skip: number,
  limit: number
): Promise<{ places: Place[]; totalPlaceCnt: number }> => {
  try {
    const Place = mongoose.model("Place");
    const SavedPlace = mongoose.model("SavedPlace");

    const placeTypeFilter =
      filterObj.placeTypes.length > 0
        ? { $in: filterObj.placeTypes }
        : { $exists: true };

    const availabilityFilter =
      filterObj.availability.length > 0
        ? { $all: filterObj.availability }
        : { $exists: true };

    const boundaryCondition = boundary
      ? {
          spotLat: { $gte: boundary.latStart, $lte: boundary.latEnd },
          spotLng: { $gte: boundary.lngStart, $lte: boundary.lngEnd },
        }
      : { spotLat: { $exists: true } };

    // let savedPlaceIds: string[] = [];
    // if (filterObj.saved) {
    const savedPlaces = await SavedPlace.find({ userId }).lean();
    const savedPlaceIds = savedPlaces.map((p: any) => p.placeId);
    // }

    const condition = {
      ...boundaryCondition,
      placeType: placeTypeFilter,
      availability: availabilityFilter,
      status: STATUS_OPEN,
      id: filterObj.saved ? { $in: savedPlaceIds } : { $exists: true },
    };

    // get place
    let places = await Place.find(condition)
      .sort({ reviewStars: -1, testCnt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const placeHeaders = places.map((p: any) => {
      return {
        ...p,
        savedByUser: savedPlaceIds.includes(p.id),
      };
    });

    const totalPlaceCnt = await Place.countDocuments(condition);

    return { places: placeHeaders, totalPlaceCnt };
  } catch (err) {
    throw err;
  }
};
