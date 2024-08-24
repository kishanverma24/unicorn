import React, { useContext } from "react";
import { useEffect, useState } from "react";
const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedData = localStorage.getItem("user");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => {
  const { user, setUser } = useContext(UserContext);
  return [user, setUser];
};
