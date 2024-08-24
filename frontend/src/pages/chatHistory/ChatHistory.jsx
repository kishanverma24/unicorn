import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatHistory = async () => {
    const response = await fetch(
      "http://localhost:5000/api/chathistory/getchat",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setChatHistory(data.chatHistory);
    console.log(data);
  };

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "2vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            alignItems: "center",
            width: "80vw",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {chatHistory.chats?.map((chat) => (
            <Link
              to={`/chat/${chat.userName}`}
              style={{ textDecoration: "none", color: "black" }}
              key={chat._id} // using _id as key
            >
              <h6
                style={{
                  alignContent: "center",
                  padding: "0.5vh",
                  height: "5vh",
                  width: "80%",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  fontSize: "3vh",
                }}
              >
                {chat.userName}
              </h6>
            </Link>
          ))}
        </div>
      </div>
      <button onClick={handleChatHistory}>ChatHistory</button>
      <button onClick={handleCreateChatHistory}>Create ChatHistory</button>
    </>
  );
};

export default ChatHistory;
