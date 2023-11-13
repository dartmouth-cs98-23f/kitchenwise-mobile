import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/recipe";

export const getSuggestedRecipes = async (userId) => {
  return (await axios.get(URL + "/suggested", { params: { userId } })).data;
};

export const getSavedRecipes = async (userId) => {
  return (await axios.get(URL + "/saved", { params: { userId } })).data;
};

export const saveRecipe = async (userId, recipeId) => {
  return (await axios.post(URL + "/save", { userId, recipeId })).data;
};
