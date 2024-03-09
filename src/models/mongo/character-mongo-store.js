import { Character } from "./character.js";

export const characterMongoStore = {
    async getAllCharacters() {
      const characters = await Character.find().lean();
      return characters;
    },
  
    async addCharacter(name) {
      const existingCharacter = await Character.findOne({ name: name }).lean();
      if (existingCharacter) {
        return existingCharacter;
      }
      const newCharacter = new Character({name: name });
      await newCharacter.save();
      return newCharacter;
    },
  
    async getCharacterById(id) {
      const character = await Character.findOne({ _id: id }).lean();
      return character;
    },
  
    async deleteCharacterById(id) {
      const character = await Character.findOneAndDelete({ _id: id });
      return character;
    },
  
    async deleteAllCharacters() {
      await Character.deleteMany({});
    },
  };