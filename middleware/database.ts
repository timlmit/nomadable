import mongoose from "mongoose";
import nextConnect from "next-connect";

import { UserSchema } from "../models/user.model";
import { SequenceSchema } from "../models/sequence.model";
import { OneTimeCodeSchema } from "../models/onetimecode.model";
import { PlaceSchema } from "../models/place.model";
import { CheckInSchema } from "../models/checkin.model";
import { PointSchema } from "../models/point.model";

mongoose.connect(process.env.DB_URL);

async function database(req: any, res: any, next: any) {
  UserSchema(mongoose);
  SequenceSchema(mongoose);
  OneTimeCodeSchema(mongoose);
  PlaceSchema(mongoose);
  CheckInSchema(mongoose);
  PointSchema(mongoose);
  req.mongoose = mongoose;
  next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
