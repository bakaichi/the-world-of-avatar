/* eslint-disable quotes */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { db } from "../models/db.js";

export const nationController = {
    index: {
        handler: async function (request, h) {
            const characters = await db.characterStore.getAllCharacters(); // getting list of known characters
            const nation = await db.nationStore.getNationById(request.params.id);
            const lores = await db.loreStore.getLoresByNationId(request.params.id)
            const viewData = {
                title: "Nation",
                nation: nation,
                characters: characters,
                lores: lores,
            };
            return h.view("lore-view", viewData);
        },
    },

    addLore: {
        handler: async function (request, h) {
            const nationId = request.payload.nationid;
            const nation = await db.nationStore.getNationById(nationId);

            let charactersInvolved = request.payload.charactersinv;
            
            // ensure that the charactersinvolved is an array
            if (!Array.isArray(charactersInvolved)) {
                charactersInvolved = [charactersInvolved];
            }
            // cleanup for ensuring unnecessary duplicate titles
            const characterNames = charactersInvolved.map(name => typeof name === 'string' ? name.trim() : '').filter(name => name !== '');
    
            // check if character already exists in db 
            for (const characterName of characterNames) {
                await db.characterStore.addCharacter(characterName);
            }
    
            const newLore = {
                bookno: request.payload.bookno,
                charactersinv: characterNames.join(', '), // joins array with commas
                location: request.payload.location,
                lore: request.payload.lore,
            };    
            await db.loreStore.addLore(nation._id, newLore);    
            return h.redirect(`/nation/${nation._id}`);
        },
    },
    
};
