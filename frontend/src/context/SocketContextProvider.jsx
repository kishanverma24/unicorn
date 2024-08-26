import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useUserProvider } from "./UserContextProvider";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useUserProvider(); // current logged in user
  const socket = useRef();
  
  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", user._id);
      
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [user]);
  
 

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketProvider = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error(
      "useSocketProvider must be used within a SocketContextProvider"
    );
  }
  return socket;
};
