import React, { useContext } from "react";
import { useEffect, useState } from "react";
const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedData = localStorage.getItem("user");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => {
  return useContext(UserContext);
};
