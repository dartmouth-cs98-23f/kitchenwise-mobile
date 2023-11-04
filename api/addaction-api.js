import axios from "axios";
import { API_URL } from "./urls";

export const getPendingAction = async (userId = "653997da2d9889247c37976e") => {
  return (
    await axios.get(`${API_URL}/addaction/pending`, {
      params: { userId },
    })
  ).data;
};

export const confirmAction = async (actionId) => {
  return await axios.post(`${API_URL}/addaction/confirm`, { actionId });
};

export const rejectAction = async (actionId) => {
  return await axios.post(`${API_URL}/addaction/reject`, { actionId });
};
