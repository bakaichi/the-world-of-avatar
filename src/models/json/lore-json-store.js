import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const loreJsonStore = {
  async getAllLores() {
    await db.read();
    return db.data.lores;
  },

  async addLore(nationId, lore) {
    await db.read();
    lore._id = v4();
    lore.nationid = nationId;
    db.data.lores.push(lore);
    await db.write();
    return lore;
  },

  getLoresByNationId: async function(id) {
      await db.read();
      const lores = db.data.lores.filter(lore => lore.nationid === id);
      return lores;
  },

  async getLoreById(id) {
    let foundLore = lores.find((lore) => lore._id === id);
    if (!foundLore){
      foundLore = null;
    }
    return foundLore;
  },

  async deleteLore(id) {
    const index = lores.findIndex((lore) => lore._id === id);
    if (index !== -1) lores.splice(index, 1);
  },

  async deleteAllLores() {
    db.data.lores = [];
    await db.write();
  },

  async updateLore(lore, updatedLore) {
    lore.bookno = updatedLore.bookno;
    lore.charactersinv = updatedLore.charactersinv;
    lore.location = updatedLore.location;
    lore.lore = updatedLore.lore;
    await db.write();
  },
};