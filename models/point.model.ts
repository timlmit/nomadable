export const PointSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const PointSchema = new Schema({
    userId: { type: String },
    timestamp: { type: Number },
    point: { type: Number },
    type: { type: String },
    referenceId: { type: String },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    PointSchema.index(
      {
        userId: 1,
      },
      { unique: false }
    );

    PointSchema.index(
      {
        date: -1,
      },
      { unique: false }
    );
    mongoose.model("Point", PointSchema);
  } catch (error: any) {}
};
