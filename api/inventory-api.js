import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/inventory";

export const getUserInventories = async (userId) => {
  return (await axios.get(URL + "/all", { params: { userId } })).data;
};

export const getAllItems = async (userId) => {
  return (await axios.get(URL + "/allitems", { params: { userId } })).data;
};

export const createInventory = async (userId, title) => {
  return (await axios.post(URL + "/create", { userId, title })).data;
};

export const renameInventory = async (userId, inventoryId, newTitle) => {
  return (await axios.patch(URL + "/rename", { userId, inventoryId, newTitle }))
    .data;
};
