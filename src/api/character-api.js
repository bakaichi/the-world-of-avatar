import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const characterApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const characters = await db.characterStore.getAllcharacters();
        return characters;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const character = await db.characterStore.getCharacterById(request.params.id);
        if (!character) {
          return Boom.notFound("No character with this id");
        }
        return character;
      } catch (err) {
        return Boom.serverUnavailable("No character with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const character = request.payload;
        const newCharacter = await db.characterStore.addCharacter(character);
        if (newCharacter) {
          return h.response(newCharacter).code(201);
        }
        return Boom.badImplementation("error creating character");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const character = await db.characterStore.getCharacterById(request.params.id);
        if (!character) {
          return Boom.notFound("No character with this id");
        }
        await db.characterStore.deleteCharacterById(character._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No character with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.characterStore.deleteAllCharacter();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};