import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";
import Header from "../../components/header/Header";
import { useSocketProvider } from "../../context/SocketContextProvider";

function Chat() {
  const navigate = useNavigate();
  const { recipientid, recipientusername } = useParams();
  const [messages, setMessages] = useState([]); // all the messages which are sent and received
  const [recipientId, setRecipientId] = useState(""); // the person from whom the messages are sent/received
  const [msg, setMsg] = useState(""); // the message which we want to send
  const [arrivalMessage, setArrivalMessage] = useState(null); // the message which has arrived through socket connection
  const [user] = useUserProvider(); // current logged in user

  const socket = useSocketProvider();
  useEffect(() => {
    // Check if user is logged in or not
    if (!user) {
      console.log("User not found!");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setRecipientId(recipientid);
  }, [recipientid]);

  useEffect(() => {
    if (user && socket) {
      socket?.current?.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, id: Date.now() });
      });

      // Cleanup on component unmount
      return () => {
        socket.current.off("msg-receive");
      };
    }
  }, [user, socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const handleSendMsg = async () => {
    if (socket && recipientId && msg) {
      const messageObject = {
        fromSelf: true,
        message: msg,
        id: Date.now(),
      };

      const response = await fetch("http://localhost:5000/api/messages/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Your request body data
          from: user._id,
          to: recipientId,
          message: msg,
        }),
      });
      const data = await response.json();
      console.log(data);

      const response2 = await fetch("http://localhost:5000/api/chathistory/addchat",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newChat: {
              userId: recipientId,
              userName: recipientusername,
            },
          }),
        }
      );
      const data2 = await response2.json();
      console.log(data2);

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
