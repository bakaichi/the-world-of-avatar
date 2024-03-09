/* eslint-disable no-await-in-loop */
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testLores, toph, testNations, fire } from "./fixtures.js";

suite ("Lore Model tests", () => {
    let tophList = null;

    setup (async () => {
        db.init("json");
        await db.nationStore.deleteAllNations();
        await db.loreStore.deleteAllLores();
        tophList = await db.nationStore.addNation(fire);
        for (let i = 0; i < testLores.length; i += 1){
            testLores[i] = await db.loreStore.addLore(tophList._id, testLores[i]);
        }
    });
    
    test("create single lore", async () => {
        const fireList = await db.nationStore.addNation(fire);
        const lore = await db.loreStore.addLore(fireList._id, toph);
        assert.isNotNull(lore._id);
        assert(toph, lore);
      });
 });
