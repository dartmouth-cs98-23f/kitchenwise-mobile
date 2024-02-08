import { createContext } from "react";

export const defaultShoppingContext = {
  userShoppingLists: null,
  setUserShoppingLists: () => {},
};

const ShoppingListContext = createContext(defaultShoppingContext);

export default ShoppingListContext;