import { userJsonStore } from "./json/user-json-store.js";
import { nationJsonStore } from "./json/nation-json-store.js";
import { loreJsonStore } from "./json/lore-json-store.js";
import { characterJsonStore } from "./json/character-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { characterMongoStore } from "./mongo/character-mongo-store.js";
import { nationMongoStore } from "./mongo/nation-mongo-store.js";
import { loreMongoStore } from "./mongo/lore-mongo-store.js";


export const db = {
    userStore: null,
    nationStore: null,
    loreStore: null,
    characterStore: null,
    
  
    init(storeType) {
      switch (storeType) {
        case "mongo":
          this.userStore = userMongoStore;
          this.characterStore = characterMongoStore;
          this.nationStore = nationMongoStore;
          this.loreStore = loreMongoStore;
          connectMongo();
          break;
        default:
          this.userStore = userJsonStore;
          this.nationStore = nationJsonStore;
          this.loreStore = loreJsonStore;
          this.characterStore = characterJsonStore;
      }
    },
};