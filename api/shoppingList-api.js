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
}
