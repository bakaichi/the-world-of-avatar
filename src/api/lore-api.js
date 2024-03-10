import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { LoreSpec, NationSpec } from "../models/joi-schemas.js";

export const loreApi = {
    find: {
      auth: false,
      handler: async function (request, h) {
        try {
          const lores = await db.loreStore.getAllLores();
          return lores;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    findOne: {
      auth: false,
      async handler(request) {
        try {
          const lore = await db.loreStore.getLoreById(request.params.id);
          if (!lore) {
            return Boom.notFound("No lore with this id");
          }
          return lore;
        } catch (err) {
          return Boom.serverUnavailable("No lore with this id");
        }
      },
    },
  
    create: {
      auth: false,
      handler: async function (request, h) {
        try {
          const lore = await db.loreStore.addLore(request.params.id, request.payload);
          if (lore) {
            return h.response(lore).code(201);
          }
          return Boom.badImplementation("error creating lore");
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
        try {
          await db.loreStore.deleteAllLores();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    deleteOne: {
      auth: false,
      handler: async function (request, h) {
        try {
          const lore = await db.loreStore.getLoreById(request.params.id);
          if (!lore) {
            return Boom.notFound("No Lore with this id");
          }
          await db.loreStore.deleteLore(lore._id);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("No Lore with this id");
        }
      },
    },
  };