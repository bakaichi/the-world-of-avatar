import { userJsonStore } from "./json/user-json-store.js";
import { nationJsonStore } from "./json/nation-json-store.js";
import { loreJsonStore } from "./json/lore-json-store.js";

export const db = {
    userStore: null,
    nationStore: null,
    loreStore: null,
    
  
    init() {
      this.userStore = userJsonStore;
      this.nationStore = nationJsonStore;
      this.loreStore = loreJsonStore;
    },
  };