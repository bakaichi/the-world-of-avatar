/* eslint-disable no-await-in-loop */
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testLores, toph, fire } from "./fixtures.js";

suite ("Lore Model tests", () => {
    let tophList = null;

    setup (async () => {
        db.init("mongo");
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

      test("create multiple lores", async () => {
        const nationId = await db.nationStore.nationId;
        const initialLoreCount = (await db.loreStore.getLoresByNationId(nationId)).length;
        await db.loreStore.addLore(nationId, toph); 
        const newLoreCount = (await db.loreStore.getLoresByNationId(nationId)).length;
        assert.equal(newLoreCount, initialLoreCount + 1, "Should increase by 1");
      });

      test("update a lore", async () => {
        const nationId = await db.nationStore.nationId;
        let lore = await db.loreStore.addLore(nationId, toph);
        const updatedLore = { ...toph, lore: "Updated lore content" };
        await db.loreStore.updateLore(lore._id, updatedLore);
        lore = await db.loreStore.getLoreById(lore._id);
        assert.equal(lore.lore, "Updated lore content", "Lore content should be updated");
      });

      test("delete all lores", async () => {
        let returnedLores = await db.loreStore.getAllLores();   
        assert.equal(returnedLores.length, 3);
        await db.loreStore.deleteAllLores();
        returnedLores = await db.loreStore.getAllLores();
        assert.equal(returnedLores.length, 0);
      });
 });
