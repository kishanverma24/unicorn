import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";

function Chat() {
  const navigate = useNavigate();
  const [yourName, setYourName] = useState("");
  const [yourId, setYourId] = useState("");
  const [messages, setMessages] = useState([]);
  const [toSendingId, setToSendingId] = useState("");
  const [msg, setMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [user, setUser] = useUserProvider();

  const socket = useRef();

  useEffect(() => {
    const checkUser = () => {
      if (!user) {
        console.log("User not found!");
        navigate("/login");
      } else {
        console.log("Good to go!");
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userName = user.username;
        const userId = user._id;
        setYourName(userName || "");
        setYourId(userId || "");
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (yourName && yourId) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", yourId);

      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, id: Date.now() });
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [yourName, yourId]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSendMsg = () => {
    if (socket.current && toSendingId && msg) {
      const messageObject = {
        fromSelf: true,
        message: msg,
        id: Date.now(),
      };
      socket.current.emit("send-msg", {
        from: yourId,
        to: toSendingId,
        msg,
      });
      setMessages((prev) => [...prev, messageObject]);
      setMsg(""); // Clear message input after sending
    } else {
      console.error("Message or recipient ID cannot be empty");
    }
  };

  return (
    <>
      <div
        className="user-info"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          boxShadow: "0 -1px 5px rgba(0,0,0,0.5)",
          backgroundColor: "lightcyan",
          borderRadius: "10px",
        }}
      >
        <h3>Your Username: {yourName}</h3>
        <h3>Your User Id: {yourId}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div
        className="messages"
        style={{
          marginTop: "200px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className="message"
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: message.fromSelf ? "#d1e7dd" : "#f8d7da",
              alignSelf: message.fromSelf ? "flex-end" : "flex-start",
              maxWidth: "60%",
              wordWrap: "break-word",
              display: "inline-block",
            }}
          >
            <div className="content">
              <p style={{ margin: 0 }}>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="message-input"
        style={{
          padding: "10px",
          borderTop: "1px solid #ccc",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-evenly",
        }}
      >
        <input
          type="text"
          value={toSendingId}
          placeholder="Send To (User ID)"
          onChange={(e) => setToSendingId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "20vw" }}
        />
        <input
          type="text"
          value={msg}
          placeholder="Message"
          onChange={(e) => setMsg(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "50vw" }}
        />
        <button onClick={handleSendMsg} style={{ padding: "5px 10px" }}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;
