import { Place, PlaceWithData } from "../../redux/slices/placeSlice";
import { makeReviewsWithData } from "./makeReviewsWithData";

export const makePlaceWithData = async (
  mongoose: any,
  place: Place,
  userId?: string
) => {
  try {
    const User = mongoose.model("User");
    const CheckIn = mongoose.model("CheckIn");
    const Review = mongoose.model("Review");
    const SavedPlace = mongoose.model("SavedPlace");

    // get user
    const discoverUser = await User.findOne({ _id: place.discoveredBy });

    // check if there is a check-in by the same user in 6 hours
    const ago = new Date();
    ago.setHours(ago.getHours() - 6);

    const recentCheckInByUser = await CheckIn.findOne({
      placeId: place.id,
      userId,
      checkInTime: { $gt: ago },
    }).lean();

    // get monthly check-in count
    // const yearAgo = new Date();
    // yearAgo.setDate(yearAgo.getDate() - 365);

    const recentCheckIns = await CheckIn.find({
      placeId: place.id,
      // checkInTime: { $gt: yearAgo },
    }).lean();

    // get reviews
    const reviews = await Review.find({ placeId: place.id })
      .sort({
        votedValue: -1,
      })
      .lean();

    const reviewsWithData = await makeReviewsWithData(
      mongoose,
      reviews,
      userId
    );

    const savedByUser = await SavedPlace.exists({ userId, placeId: place.id });

    // make
    const placeWithData: PlaceWithData = {
      ...place,
      userName: discoverUser ? discoverUser.name : "",
      userPicture: discoverUser ? discoverUser.picture : "",
      userDescription: discoverUser ? discoverUser.description : "",
      userTitle: discoverUser ? discoverUser.title : "",
      recentCheckInCnt: recentCheckIns.length,
      checkedInByUser: recentCheckInByUser ? true : false,
      savedByUser,
      reviewsWithData,
    };

    return placeWithData;
  } catch (err) {
    throw err;
  }
};
