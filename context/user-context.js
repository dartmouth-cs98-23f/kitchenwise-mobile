import { createContext } from "react";

export const defaultUserContext = {
  userId: null,
  setUserId: () => {},
};

const UserContext = createContext(defaultUserContext);

export default UserContext;
