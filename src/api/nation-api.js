import Boom from "@hapi/boom";
import { NationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const nationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const nations = await db.nationStore.getAllNations();
        return nations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const nation = await db.nationStore.getNationById(request.params.id);
        if (!nation) {
          return Boom.notFound("No Nation with this id");
        }
        return nation;
      } catch (err) {
        return Boom.serverUnavailable("No Nation with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const nation = request.payload;
        const newNation = await db.nationStore.addNation(nation);
        if (newNation) {
          return h.response(newNation).code(201);
        }
        return Boom.badImplementation("error creating nation");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const nation = await db.nationStore.getNationById(request.params.id);
        if (!nation) {
          return Boom.notFound("No Nation with this id");
        }
        await db.nationStore.deleteNationById(nation._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Nation with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.nationStore.deleteAllNations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};