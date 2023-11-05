import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/inventory";

console.log(`${URL}/all`);
export const getUserInventories = async (userId) => {
  console.log(userId);
  return (await axios.get(`${URL}/all`, { params: { userId } })).data;
};
