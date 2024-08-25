import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";
import Header from "../../components/header/Header";

function Chat() {
  const navigate = useNavigate();
  const { recipientid, recipientusername } = useParams();
  const [messages, setMessages] = useState([]); // all the messages which are sended and received
  const [recipientId, setRecipientId] = useState(""); // the person from whom the messages are sended/received
  const [msg, setMsg] = useState(""); // the message which we wants to send
  const [arrivalMessage, setArrivalMessage] = useState(null); // the message which have arrived through socket connection
  const [user] = useUserProvider(); // current logged in user

  const socket = useRef();

  useEffect(() => {
    // to check user is logged in or not
    if (!user) {
      console.log("User not found!");
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    setRecipientId(recipientid);
  }, [recipientid, recipientusername]);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", user._id);

      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, id: Date.now() });
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user._id, user.username]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleSendMsg = () => {
    if (socket.current && recipientId && msg) {
      const messageObject = {
        fromSelf: true,
        message: msg,
        id: Date.now(),
      };
      socket.current.emit("send-msg", {
        from: user._id,
        to: recipientId,
        msg,
      });
      setMessages((prev) => [...prev, messageObject]);
      setMsg(""); // Clear message input after sending
    } else {
      alert("Message can't be empty");
    }
  };

  return (
    <>
      <Header />
      <div
        className="user-info"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          boxShadow: "0 -5px 5px rgba(0,0,0,0.5)",
          backgroundColor: "lightcyan",
          borderRadius: "10px",
          marginTop: "1vh",
          marginBottom: "1vh",
          marginRight: "1vw",
          marginLeft: "1vw",
        }}
      >
        <h3>To : {recipientusername}</h3>
        {/* <h3>Your User Id: {recipientid}</h3> */}
      </div>
      <div
        className="messages"
        style={{
          padding: "2vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className="message"
            style={{
              margin: "1vh 0",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: message.fromSelf ? "#d1e7dd" : "#f8d7da",
              alignSelf: message.fromSelf ? "flex-start" : "flex-end",
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
          padding: "1.5vh",
          borderTop: "1px solid #ccc",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Adjusted to space elements as required
        }}
      >
        <input
          type="text"
          value={msg}
          placeholder="Message"
          onChange={(e) => setMsg(e.target.value)}
          style={{ padding: "1vw", width: "60%" }} // 60% width for input
        />
        <button
          onClick={handleSendMsg}
          style={{
            padding: "1vw",
            width: "35%",
            marginRight: "3vw",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;
