import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/shoppinglist"

export const createNewShoppingList = async (userId, title) => {
  return (await axios.post(URL + "/create", { params: { userId, title } })).data;
};


export const getUserShoppingLists = async (userId) => {
  return (await axios.get(URL + "/all", { params: { userId } })).data;
};

export const addItemToList = async (userId) => {
  return (await axios.get(URL + "/additem", { params: { userId } })).data
}