import { db } from "../models/db.js";

export const nationController = {
    index: {
        handler: async function (request, h) {
            const characters = await db.characterStore.getAllCharacters(); // getting list of known characters
            const nation = await db.nationStore.getNationById(request.params.id);
            const viewData = {
                title: "Nation",
                nation: nation,
                characters: characters,
            };
            return h.view("lore-view", viewData);
        },
    },

    addLore: {
        handler: async function (request, h) {
            const nation = await db.nationStore.getNationById(request.params.id);
            let characterName = request.payload.charactersinv;
            // check if new character was entered
            if (request.payload.newCharacter.trim() !== "") {
                characterName = request.payload.newCharacter.trim();
                // add to db of known characters
                await db.characterStore.addCharacter(characterName);
            }
            const newLore = {
                bookno: request.payload.bookno,
                charactersinv: characterName,
                location: request.payload.location,
                lore: request.payload.lore,
            };
            await db.loreStore.addLore(nation._id, newLore);
            return h.redirect(`/nation/${nation._id}`);
        },
    },
};
