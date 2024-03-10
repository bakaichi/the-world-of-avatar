import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { twoaService } from "./twoa-service.js";
import { fire, toph, testLores, testNations, maggie } from "../fixtures.js";

suite("Lore API tests", () => {
    let user = null;
    let fireNation = null;

    setup(async () => {
        await twoaService.deleteAllNations();
        await twoaService.deleteAllUsers();
        await twoaService.deleteAllLores();
        user = await twoaService.createUser(maggie);
        maggie.userid = user._id;
        fireNation = await twoaService.createNation(fire);
    });

    teardown(async () => {});

    test("create lore", async () => {
        const returnedLore = await twoaService.createLore(fireNation._id, toph);
        assertSubset(toph, returnedLore);
    });

    test("create Multiple lores", async () => {
        for (let i = 0; i < testLores.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          await twoaService.createLore(fireNation._id, testLores[i]);
        }
        const returnedLores = await twoaService.getAllLores();
        assert.equal(returnedLores.length, testLores.length);
        for (let i = 0; i < returnedLores.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          const lore = await twoaService.getLore(returnedLores[i]._id);
          assertSubset(lore, returnedLores[i]);
        }
      });
})