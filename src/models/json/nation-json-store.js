import { v4 } from "uuid";
import { db } from "./store-utils.js"
import { loreJsonStore } from "./lore-json-store.js";


export const nationJsonStore = {
    async getAllNations() {
      await db.read();
      return db.data.nations;
    },
  
    async addNation(nation) {
      await db.read();
      nation._id = v4();
      db.data.nations.push(nation);
      await db.write();
      return nation;
    },
  
    async getNationById(id) {
      await db.read();
      // eslint-disable-next-line no-shadow
      const nation = db.data.nations.find(nation => nation._id === id);
      return nation;
    },
    
    async getUserNations(userid) {
      await db.read();
      return db.data.nations.filter((nation) => nation.userid === userid);
    },
  
    async deleteNationById(id) {
      await db.read();
      const index = db.data.nations.findIndex((nation) => nation._id === id);
      db.data.nations.splice(index, 1);
      await db.write();
    },
  
    async deleteAllNations() {
      db.data.nations = [];
      await db.write();
    },
  };