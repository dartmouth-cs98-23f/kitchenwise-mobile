import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/statistics";

export const getStatistics = async (userId) => {
  return (await axios.get(URL + "/", { params: { userId } }))
    .data;
};
