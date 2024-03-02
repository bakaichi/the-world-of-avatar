import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const loreJsonStore = {
  async getAllLores() {
    await db.read();
    return db.data.lores;
  },

  async addLore(nationId, lore) {
    await db.read();
    track._id = v4();
    track.nationid = nationId;
    db.data.lores.push(lore);
    await db.write();
    return lore;
  },

  async getLoresByNationId(id) {
    await db.read();
    return db.data.lores.filter((lore) => lore.nationid === id);
  },

  async getLoreById(id) {
    await db.read();
    return db.data.lores.find((lore) => lore._id === id);
  },

  async deleteLore(id) {
    await db.read();
    const index = db.data.lores.findIndex((lore) => lore._id === id);
    db.data.lores.splice(index, 1);
    await db.write();
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