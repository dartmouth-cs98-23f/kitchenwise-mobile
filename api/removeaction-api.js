import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/removeaction";

export const createRemoveAction = async (foodItem, inventoryId, userId) => {
  console.log(foodItem);
  return (await axios.post(URL + "/create", { foodItem, inventoryId, userId }))
    .data;
};
