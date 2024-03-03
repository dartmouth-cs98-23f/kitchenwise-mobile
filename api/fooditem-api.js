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

export const sendReceipt = async (userId, receiptPhotoUri) => {
  // FormData logic from https://www.reactnativeschool.com/how-to-upload-images-from-react-native
  const data = new FormData();

  data.append("receipt", {
    name: "receipt",
    type: "jpeg",
    uri: receiptPhotoUri,
  });
  data.append("userId", userId);

  return (await axios.post(URL + "/scanreceipt", data)).data;
};
