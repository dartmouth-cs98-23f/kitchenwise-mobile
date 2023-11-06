import { createContext } from "react";

export const defaultInventoryContext = {
  userInventories: null,
  setUserInventories: () => {},
};

const InventoryContext = createContext(defaultInventoryContext);

export default InventoryContext;
