import Mongoose from "mongoose";

const { Schema } = Mongoose;

const characterSchema = new Schema({
  name: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Character = Mongoose.model("Character", characterSchema);