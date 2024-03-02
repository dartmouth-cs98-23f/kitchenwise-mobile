import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/shoppinglist"

export const createNewShoppingList = async (userId, title) => {
  return (await axios.post(URL + "/create",  { title, userId } )).data;
};


export const getUserShoppingLists = async (userId) => {
  return (await axios.get(URL + "/all", { params: { userId } })).data;
};

export const addItemToList = async (userId, title, foodItem, foodAmount) => {
  return (await axios.put(URL + "/additem",  { userId, title, foodItem, foodAmount } )).data
}

export const getUserShoppingListItems = async (userId, title) => {
  return (await axios.get(URL + "/allitems", { params: {userId, title}})).data;
};

export const deleteShoppingItem = async (userId, title, itemId) => {
  return (await axios.delete(URL + "/delete",  { userId, title, itemId} )).data;
};

export const exportToShoppingList = async (userId, listName, items, inv) => {
  return (await axios.post(URL + "/export", {userId, listName, items, inv})).data;
}


export const importToShoppingList = async (userId, title) => {
  return (await axios.post(URL + "/import", {userId, title})).data;
}

export const deleteList = async (listName) => {
  return (await axios.delete(URL + "/deletelist", { data: { listName } })).data;
};