import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/fooditem";

export const editFoodItem = async (inventoryId, foodItemId, newFoodItem) => {
  return (
    await axios.patch(URL + "/edititem", {
      inventoryId,
      foodItemId,
      newFoodItem,
    })
  ).data;
};

export const addFoodItem = async (userId, inventoryId, foodItem) => {
  return (
    await axios.post(URL + "/additem", {
      userId,
      inventoryId,
      foodItem,
    })
  ).data;
};
