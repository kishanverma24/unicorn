import React, { useContext, useEffect, useState } from "react";
// import { useUserProvider } from "./UserContextProvider";
// import { useSocketProvider } from "./SocketContextProvider";
const MessageContext = React.createContext();

export const MessageContextProvider = ({ children }) => {
  // Initialize the chat as a Map and store it in the state
  const [chats, setChats] = useState(new Map());
  // const { user } = useUserProvider(); // current logged in user
  // const socket = useSocketProvider();
  // const [arrivalMessage, setArrivalMessage] = useState(null);

  // useEffect(() => {
  //   if (user && socket) {
  //     socket?.current?.on("msg-receive", (data) => {
  //       setArrivalMessage({
  //         fromSelf: false,
  //         message: data.msg,
  //         from: data.from,
  //       });
  //     });

  //     return () => {
  //       socket.current.off("msg-receive");
  //     };
  //   }
  // }, [user, socket]);

  // useEffect(() => {
  //   if (arrivalMessage) {
  //     addChat(arrivalMessage.from, arrivalMessage);
  //   }
  // }, [arrivalMessage]);

  // Function to add a new chat message
  const addChat = (chatId, message) => {
    setChats((prevChats) => {
      const updatedChats = new Map(prevChats);
      if (!updatedChats.has(chatId)) {
        updatedChats.set(chatId, []);
      }
      updatedChats.get(chatId).push(message);
      return updatedChats;
    });
  };

  return (
    <MessageContext.Provider value={{ chats, setChats, addChat }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageProvider = () => {
  const { chats, addChat } = useContext(MessageContext);
  if (!(chats && addChat)) {
    throw new Error(
      "useMessageProvider must be used within a MessageContextProvider"
    );
  }
  return [chats, addChat];
};
