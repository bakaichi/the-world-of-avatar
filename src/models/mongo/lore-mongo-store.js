import { Nation } from "./nation.js";
import { Lore } from "./lore.js";

export const loreMongoStore = {
    async getAllLores() {
      const lores = await Lore.find().lean();
      return lores;
    },
  
    async addLore(nationId, lore) {
      lore.nationid = nationId;
      const newLore = new Lore(lore);
      const loreObj = await newLore.save();
      return this.getLoreById(loreObj._id);
    },
  
    async getLoresByNationId(id) {
      const lores = await Lore.find({ nationid: id }).lean();
      return lores;
    },
  
    async getLoreById(id) {
        if (id) {
            const lore = await Lore.findOne({_id: id}).lean();
            return lore;
        }
        return null;
    },
  
    async deleteLore(id) {
      try {
        await Lore.deleteOne({ _id: id });
      } catch (error) {
        console.log("Error deleting lore:", error);
      }
    },
  
    async deleteAllLores() {
      await Lore.deleteMany({});
    },
  
    async updateLore(loreId, updatedLore) {
      const loreToUpdate = await Lore.findOne({ _id: loreId });
      if (loreToUpdate) {
        loreToUpdate.bookno = updatedLore.bookno;
        loreToUpdate.charactersinv = updatedLore.charactersinv;
        loreToUpdate.location = updatedLore.location;
        loreToUpdate.lore = updatedLore.lore;
        await loreToUpdate.save();
        return loreToUpdate;
      }
      return null;
    },
  };