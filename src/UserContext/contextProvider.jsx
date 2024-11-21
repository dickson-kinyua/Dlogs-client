import { UserContext } from "./userContext";
import { useState } from "react";
import PropTypes from "prop-types";

export const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};
// Add prop types validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed
};
