import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/inventory";

export const getUserInventories = async (userId) => {
  return (await axios.get(`${URL}/all`, { params: { userId } })).data;
};
