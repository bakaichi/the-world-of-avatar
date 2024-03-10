import { EventEmitter } from "events";
import { assert } from "chai";
import { twoaService } from "./twoa-service.js";
import { assertSubset } from "../test-utils.js";
import { fire, testNations } from "../fixtures.js"

EventEmitter.setMaxListeners(25);

suite("Playlist API tests", () => {

  setup(async () => {
  });

  teardown(async () => {});

  test("create nation", async () => {
  });

  test("delete a nation", async () => {
  });

  test("create multiple nations", async () => {
  });

  test("remove non-existant nation", async () => {
  });
});