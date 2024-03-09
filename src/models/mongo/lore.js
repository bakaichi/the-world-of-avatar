import Mongoose from "mongoose";

const { Schema } = Mongoose;

const loreSchema = new Schema({
    bookno: Number,
    charactersinv: String,
    location: String,
    lore: String,
    nationid: {
        type: Schema.Types.ObjectId,
        ref: "Nation",
    },
});

export const Lore = Mongoose.model("Lore", loreSchema);
