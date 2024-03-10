import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testNations, fire } from "./fixtures.js";

suite ("Nation Model tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.nationStore.deleteAllNations();
        for (let i = 0; i < testNations.length; i += 1){
            // eslint-disable-next-line no-await-in-loop
            testNations[i] = await db.nationStore.addNation(testNations[i]);
        }
    });

    test("create a nation", async () => {
        const nation = await db.nationStore.addNation(fire);
        assert.equal(nation.title, "Fire");
        assert.isDefined(nation._id);
      });
    
      test("delete all nations", async () => {
        let returnedNations = await db.nationStore.getAllNations();   
        assert.equal(returnedNations.length, 3);
        await db.nationStore.deleteAllNations();
        returnedNations = await db.nationStore.getAllNations();
        assert.equal(returnedNations.length, 0);
      });
    
      test("get a nation - success", async () => {
        const nation = await db.nationStore.addNation(fire);
        const returnedNation = await db.nationStore.getNationById(nation._id);
        assert.equal(fire.title, returnedNation.title);
      });
    
      test("delete One Nation - success", async () => {
        const id = testNations[0]._id;
        await db.nationStore.deleteNationById(id);
        const returnedNations = await db.nationStore.getAllNations();
        assert.equal(returnedNations.length, testNations.length - 1);
        const deletedNation = await db.nationStore.getNationById(id);
        assert.isNull(deletedNation);
      });
    
      test("delete One Nation - fail", async () => {
        await db.nationStore.deleteNationById("bad-id");
        const allNations = await db.nationStore.getAllNations();
        assert.equal(testNations.length, allNations.length);
      });
 });
