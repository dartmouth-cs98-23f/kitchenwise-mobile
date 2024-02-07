import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/shoppinglist"

export const createNewShoppingList = async (userId, title) => {
  return (await axios.post(URL + "/create", { params: { userId, title } })).data;
};