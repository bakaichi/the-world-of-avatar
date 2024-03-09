import Mongoose from "mongoose";

const { Schema } = Mongoose;

const nationSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Nation = Mongoose.model("Nation", nationSchema);