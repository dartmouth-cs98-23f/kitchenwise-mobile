import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/addaction";

export const getPendingAction = async (userId) => {
  return (
    await axios.get(`${URL}/pending`, {
      params: { userId },
    })
  ).data;
};

export const reviseAction = async (action) => {
  return await axios.put(`${URL}/revise`, action);
};

export const confirmAction = async (actionId) => {
  return await axios.post(`${URL}/confirm`, { actionId });
};

export const rejectAction = async (actionId) => {
  return await axios.post(`${URL}/reject`, { actionId });
};
