import { createContext } from "react";

export const defaultRecipeContext = {
  savedRecipeIds: {},
  setSavedRecipeIds: () => {},
  refreshSavedRecipes: () => {},
};

const RecipeContext = createContext(defaultRecipeContext);

export default RecipeContext;
