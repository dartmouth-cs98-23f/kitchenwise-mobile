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

export const addFoodItem = async (userId, foodItem = null, inventoryId) => {
  return (
    await axios.post(URL + "/additem", {
      userId,
      inventoryId,
      foodItem,
    })
  ).data;
};

export const addFoodItems = async (userId, foodItems) => {
  return (
    await axios.post(URL + "/additems", {
      userId,
      foodItems,
    })
  ).data;
};
