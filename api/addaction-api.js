import axios from "axios";
import { API_URL } from "./urls";

export const getPendingAction = (userId = "653997da2d9889247c37976e") => {
  axios
    .get(`${API_URL}/addaction/pending`, { params: { userId } })
    .then((data) => {});
};
