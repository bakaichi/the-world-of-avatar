import { use } from "chai";
import { db } from "../models/db.js";

export const adminDashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const characters = await db.characterStore.getAllCharacters(); 
      const nations = await db.nationStore.getAllNations(loggedInUser._id);
      const viewData = {
        title: "Avatar Dashboard",
        user: loggedInUser,
        nations: nations,
        characters: characters,
      };
      return h.view("admin-dashboard-view", viewData);
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
      return h.redirect("/admin/dashboard");
    },
  },

  deleteNation: {
    handler: async function (request, h) {
      const nation = await db.nationStore.getNationById(request.params.id);
      await db.nationStore.deleteNationById(nation._id);
      return h.redirect("/admin/dashboard");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      if (request.auth.credentials.role !== "admin") {
        return h.redirect("/");
      }
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin/users");
    },
  },

  displayUsers: {
    handler: async function (request, h) {
      if (request.auth.credentials.role !== "admin") {
        return h.redirect("/");
      }
      const users = await db.userStore.getAllUsers();
      return h.view("admin-users-view", {
        title: "Manage Users",
        users: users,
      });
    },
  },
};