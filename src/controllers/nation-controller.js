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
            const loggedInUser = request.auth.credentials;
            
            const viewData = {
                title: "Nation",
                nation: nation,
                characters: characters,
                lores: lores,
            };
            if (loggedInUser && loggedInUser.role === "admin") {
                return h.view("admin-lore-view", viewData);
            } 
            return h.view("lore-view", viewData);
            
        },
    },

    addLore: {
        handler: async function (request, h) {
            const nationId = request.payload.nationid;
            const nation = await db.nationStore.getNationById(nationId);
    
            let charactersInvolved = request.payload.charactersinv;
            
            // ensure that characters involved is an array
            if (!Array.isArray(charactersInvolved)) {
                charactersInvolved = [charactersInvolved];
            }
    
            // capitalize words 
            const capitalizeFirstLetter = (string) => string.split(' ')
                             .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                             .join(' ');
    
            // capitalize and cleanup character names, ensuring no unnecessary duplicates
            const characterNames = charactersInvolved.map(name => capitalizeFirstLetter(name.trim()))
                                                     .filter((value, index, self) => self.indexOf(value) === index);
    
            // Check if character already exists in db and add if not
            for (const characterName of characterNames) {
                await db.characterStore.addCharacter(characterName);
            }
    
            const newLore = {
                bookno: request.payload.bookno,
                charactersinv: characterNames.join(', '), // Joins array with commas
                location: request.payload.location,
                lore: request.payload.lore,
            };
    
            await db.loreStore.addLore(nation._id, newLore);
            return h.redirect(`/nation/${nation._id}`);
        },
    },
    
    deleteLore: {
        handler: async function (request, h) {
          try {
            const nation = await db.nationStore.getNationById(request.params.id);
            await db.loreStore.deleteLore(request.params.loreid); 
            return h.redirect(`/nation/${nation._id}`); 
          } catch (err) {
            console.log(err);
            return h.view('error', { errors: [{ message: 'Error deleting lore' }] }); 
          }
        },
      },
};
