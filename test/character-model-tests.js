/* eslint-disable no-await-in-loop */
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCharacters, newCharacter } from "./fixtures.js";

suite (" Character Model tests ", () => {

    setup(async () => {
        db.init("mongo");
        await db.characterStore.deleteAllCharacters();
        for (let i = 0; i < testCharacters.length; i += 1) {
            // Incorrectly passing the whole object instead of just the name string
            testCharacters[i] = await db.characterStore.addCharacter(testCharacters[i].name);
        }
    });
    

    test("add a character", async () => {
        const character = await db.characterStore.addCharacter(newCharacter.name); // Assuming newCharacter has a .name property
        assert.isNotNull(character._id, "Character should have an _id");
        assert.equal(character.name, newCharacter.name, "Character names should match");
      });
    
      test("retrieve a character by ID", async () => {
        const addedCharacter = await db.characterStore.addCharacter(newCharacter.name);
        const character = await db.characterStore.getCharacterById(addedCharacter._id);
        assert.isNotNull(character, "Character should exist");
        assert.equal(character.name, newCharacter.name, "Character names should match");
      });
    
      test("delete a character by ID", async () => {
        const character = await db.characterStore.addCharacter(newCharacter.name);
        await db.characterStore.deleteCharacterById(character._id);
        const deletedCharacter = await db.characterStore.getCharacterById(character._id);
        assert.isNull(deletedCharacter, "Character should no longer exist");
      });

      test("retrieve all characters", async () => {
        await db.characterStore.deleteAllCharacters();
        // eslint-disable-next-line no-restricted-syntax
        for (const testChar of testCharacters) {
          await db.characterStore.addCharacter(testChar.name);
        }
        const characters = await db.characterStore.getAllCharacters();
        assert.equal(characters.length, testCharacters.length);
      });

      test("delete all characters", async () => {
        await db.characterStore.deleteAllCharacters();
        const characters = await db.characterStore.getAllCharacters();
        assert.equal(characters.length, 0, "No characters should exist after deletion");
      });
});

