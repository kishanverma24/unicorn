import React from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

const ChatHistory = () => {
  const handleChatHistory= async() =>{
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Your request body data
        username: userName,
        password,
        email,
      }),
    });
    const data = await response.json();
  }
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
        <Link
          to={"/chat/username"}
          style={{ textDecoration: "none", color: "black" }}
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
              Kishan Verma
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ChatHistory;
