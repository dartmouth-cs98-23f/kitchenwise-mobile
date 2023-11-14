import axios from "axios";
import { API_URL } from "./urls";

const URL = API_URL + "/recipe";

export const getSuggestedRecipes = async (userId, refresh = false) => {
  return (await axios.get(URL + "/suggested", { params: { userId, refresh } }))
    .data;
};

export const getSavedRecipes = async (userId) => {
  return (await axios.get(URL + "/saved", { params: { userId } })).data;
};

export const saveRecipe = async (userId, recipeId) => {
  return (await axios.post(URL + "/save", { userId, recipeId })).data;
};

export const getRecipe = async (userId) => {
  return (await axios.get(URL + "/", { params: { userId, recipeId } })).data;
};

export const unsaveRecipe = async (userId, recipeId) => {
  return (await axios.delete(URL + "/unsave", { data: { userId, recipeId } }))
    .data;
};

export const searchRecipes = async (userId, searchQuery) => {
  return (await axios.get(URL + "/search", { params: { userId, searchQuery } }))
    .data;
};
