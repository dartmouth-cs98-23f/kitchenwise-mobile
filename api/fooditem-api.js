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
