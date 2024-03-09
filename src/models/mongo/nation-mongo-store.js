import { Nation } from "./nation.js";
import { loreMongoStore } from "./lore-mongo-store.js";

export const nationMongoStore = {
  async getAllNations() {
    const nations = await Nation.find().lean();
    return nations;
  },

  async addNation(nation) {
    const newNation = new Nation(nation);
    const savedNation = await newNation.save();
    return savedNation;
  },

  async getNationById(id) {
    const nation = await Nation.findOne({ _id: id }).lean();
    if (nation) {
      nation.lores = await loreMongoStore.getLoresByNationId(nation._id);
    }
    return nation;
  },

  async getUserNations(userid) {
    const nations = await Nation.find({ userid: userid }).lean();
    return nations;
  },

  async deleteNationById(id) {
    try {
      await Nation.deleteOne({ _id: id });
    } catch (error) {
      console.log("Error deleting nation:", error);
    }
  },

  async deleteAllNations() {
    await Nation.deleteMany({});
  },
};
