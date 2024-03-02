import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const nations = await db.nationStore.getUserNations(loggedInUser._id);
      const viewData = {
        title: "Avatar Dashboard",
        user: loggedInUser,
        nations: nations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addNation: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newNation = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.nationStore.addNation(newNation);
      return h.redirect("/dashboard");
    },
  },
};