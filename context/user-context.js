import { createContext } from "react";

export const defaultUserContext = {
  userId: "653997da2d9889247c37976e",
  setUserId: () => {},
};

const UserContext = createContext(defaultUserContext);

export default UserContext;
