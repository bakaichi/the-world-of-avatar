import { Character } from "./character.js";

export const characterMongoStore = {
    async getAllCharacters() {
      const characters = await Character.find().lean();
      return characters;
    },
  
    async addCharacter(name) {
      const capitalized = this.capitalizeFirstLetter(name);
      const existingCharacter = await Character.findOne({ name: capitalized }).lean();
      if (existingCharacter) {
        return existingCharacter;
      }
      const newCharacter = new Character({name: capitalized });
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

    capitalizeFirstLetter(string) {
      return string
        .split(" ") // splits the name into multiple words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(" "); // rejoin words
    }
  };