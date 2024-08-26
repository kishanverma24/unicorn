import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [user] = useUserProvider();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
    // console.log(data);
  };

  useEffect(() => {
    handleChatHistory();
  }, [user, navigate]);

  const handleDeleteChat = async (chat) => {
    let result = confirm("Press Ok to delete the message!");
    // console.log(chat, result);
    if (result == true) {
      const response = await fetch(
        "http://localhost:5000/api/chathistory/deletechat",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Your request body data

            chatUserId: chat.userId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      alert(`${data.message}`);
      navigate("/chathistory");
    } else {
      navigate("/chathistory");
    }
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
          {chatHistory?.chats?.map((chat) => (
            <div
              style={{
                width: "80vw",
                height: "5vh",
                display: "flex",
              }}
              key={chat._id} // using _id as key
            >
              <Link
                to={`/chat/${chat.userName}/${chat._id}`}
                style={{ textDecoration: "none", color: "black" }}
                // key={chat._id} // using _id as key
              >
                <h6
                  style={{
                    alignContent: "center",
                    padding: "0.5vh",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    fontSize: "3vh",
                    marginTop: "1vh",
                    height: "5vh",
                  }}
                >
                  {chat.userName}
                </h6>
              </Link>
              <button
                style={{
                  alignContent: "center",
                  padding: "0.5vh",
                  fontSize: "3vh",
                  marginTop: "1vh",
                  height: "6vh",
                  borderRadius: "none",
                  border: "none",
                  backgroundColor: "rgb(21, 52, 72)",
                  color: "rgb(21, 52, 72)",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  handleDeleteChat(chat);
                }}
              >
                hii
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
