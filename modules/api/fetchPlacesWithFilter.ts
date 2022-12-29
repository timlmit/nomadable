import {
  SORT_BY_CHECK_INS,
  SORT_BY_DISTANCE,
  SORT_BY_REVIEW,
  SORT_BY_SPEED,
  STATUS_OPEN,
} from "./../../constants";
import { Boundary } from "../../data/articles/cities";
import { FilterObj, Place, PlaceHeader } from "../../redux/slices/placeSlice";

const makeSortCondition = (sortBy: string) => {
  switch (sortBy) {
    case SORT_BY_REVIEW:
      return { reviewStars: -1 };
    case SORT_BY_CHECK_INS:
      return { testCnt: -1 };
    case SORT_BY_SPEED:
      return { speedDown: -1 };
    default:
      return { reviewStars: -1 };
  }
};

export const fetchPlacesWithFilter = async (
  mongoose: any,
  userId: string,
  boundary: Boundary | null,
  filterObj: FilterObj,
  skip: number,
  limit: number
): Promise<{ places: PlaceHeader[]; totalPlaceCnt: number }> => {
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
      .sort(makeSortCondition(filterObj.sortBy))
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
