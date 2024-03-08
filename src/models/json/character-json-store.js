import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const characterJsonStore = {
    async getAllCharacters() {
        await db.read();
        return db.data.characters;
    },

    async addCharacter(name) {
        await db.read();
        // check for duplicates
        const existingCharacter = db.data.characters.find(character => character.name === name);
        if (existingCharacter) {
            return existingCharacter; // Return the existing character if found
        }
        const newCharacter = { _id: v4(), name: name };
        db.data.characters.push(newCharacter);
        await db.write();
        return newCharacter;
    },

    async getCharacterById(id) {
        await db.read();
        return db.data.characters.find(character => character._id === id);
    },

    async deleteCharacterById(id) {
        await db.read();
        const index = db.data.characters.findIndex(character => character._id === id);
        if (index !== -1) { // Only proceed if the character is found
            db.data.characters.splice(index, 1);
            await db.write();
        }
    },

    async deleteAllCharacters() {
        db.data.characters = [];
        await db.write();
    },
};
