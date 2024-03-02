import { db } from "../models/db.js";

export const nationController = {
    index: {
        handler: async function (request, h) {
            const nation = await db.nationStore.getNationById(request.params.id);
            const viewData = {
                title: "Nation",
                nation: nation,
            };
            return h.view("lore-view", viewData);
        },
    },

    addLore: {
        handler: async function (request, h) {
            const nation = await db.nationStore.getNationById(request.params.id);
            const newLore = {
                bookno: request.payload.bookno,
                charactersinv: request.payload.charactersinv,
                location: request.payload.location,
                lore: request.payload.lore,
            };
            await db.loreStore.addLore(nation._id, newLore);
            return h.redirect(`/nation/${nation._id}`);
        },
    },
};
