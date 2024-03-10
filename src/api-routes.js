import { loreApi } from "./api/lore-api.js";
import { nationApi } from "./api/nation-api.js";
import { characterApi } from "./api/character-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },

  { method: "POST", path: "/api/nations", config: nationApi.create },
  { method: "DELETE", path: "/api/nations", config: nationApi.deleteAll },
  { method: "GET", path: "/api/nations", config: nationApi.find },
  { method: "GET", path: "/api/nations/{id}", config: nationApi.findOne },
  { method: "DELETE", path: "/api/nations/{id}", config: nationApi.deleteOne },

  { method: "POST", path: "/api/lores", config: loreApi.create },
  { method: "DELETE", path: "/api/lores", config: loreApi.deleteAll },
  { method: "GET", path: "/api/lores", config: loreApi.find },
  { method: "GET", path: "/api/lores/{id}", config: loreApi.findOne },
  { method: "DELETE", path: "/api/lores/{id}", config: loreApi.deleteOne },

  { method: "GET", path: "/api/characters", config: characterApi.find },
  { method: "GET", path: "/api/characters/{id}", config: characterApi.findOne },
  { method: "POST", path: "/api/nations/{id}/characters", config: characterApi.create },
  { method: "DELETE", path: "/api/characters", config: characterApi.deleteAll },
  { method: "DELETE", path: "/api/characters/{id}", config: characterApi.deleteOne },
];