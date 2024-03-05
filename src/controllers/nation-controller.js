/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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
            const charactersInvolved = request.payload.charactersinv || []; // ensuring character/s is an array

            // ensuring that submitted characters are an array
            const characterNames = Array.isArray(charactersInvolved) ? charactersInvolved : [charactersInvolved];

            // Process each character name, trimming and adding new ones as needed
            for (const characterName of characterNames) {
                if (characterName.trim() !== "") {
                   await  db.characterStore.addCharacter(characterName.trim());
                }
            }

            const newLore = {
                bookno: request.payload.bookno,
                // eslint-disable-next-line quotes
                charactersinv: characterNames.join(', '), // join array with , inbetween
                location: request.payload.location,
                lore: request.payload.lore,
            };

            await db.loreStore.addLore(nation._id, newLore);
            return h.redirect(`/nation/${nation._id}`);
        },
    },
};
