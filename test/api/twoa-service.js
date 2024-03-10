import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const twoaService = {
  twoaUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.twoaUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.twoaUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.twoaUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.twoaUrl}/api/users`);
    return res.data;
  },

  async createNation(nation) {
    const res = await axios.post(`${this.twoaUrl}/api/nations`, nation);
    return res.data;
  },

  async deleteAllNations() {
    const response = await axios.delete(`${this.twoaUrl}/api/nations`);
    return response.data;
  },

  async deleteNation(id) {
    const response = await axios.delete(`${this.twoaUrl}/api/nations/${id}`);
    return response;
  },

  async getAllNations() {
    const res = await axios.get(`${this.twoaUrl}/api/nations`);
    return res.data;
  },

  async getNation(id) {
    const res = await axios.get(`${this.twoaUrl}/api/nations/${id}`);
    return res.data;
  },

  async getAllLores() {
    const res = await axios.get(`${this.twoaUrl}/api/lores`);
    return res.data;
  },

  async createLore(id, lore) {
    const res = await axios.post(`${this.twoaUrl}/api/nations/${id}/lores`, lore);
    return res.data;
  },

  async deleteAllLores() {
    const res = await axios.delete(`${this.twoaUrl}/api/lores`);
    return res.data;
  },

  async getLore(id) {
    const res = await axios.get(`${this.twoaUrl}/api/lores/${id}`);
    return res.data;
  },

  async deleteLore(id) {
    const res = await axios.delete(`${this.twoaUrl}/api/lores/${id}`);
    return res.data;
  },
};