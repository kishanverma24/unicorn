import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";
import Header from "../../components/header/Header";
import { useSocketProvider } from "../../context/SocketContextProvider";
import { useMessageProvider } from "../../context/MessageContextProvider";
import { v4 as uuidv4 } from "uuid";
function Chat() {
  const navigate = useNavigate();
  const { recipientid, recipientusername } = useParams();
  const [recipientId, setRecipientId] = useState(""); // the person from whom the messages are sent/received
  const [msg, setMsg] = useState(""); // the message which we want to send
  const [arrivalMessage, setArrivalMessage] = useState(null); // the message which has arrived through socket connection
  const { user } = useUserProvider(); // current logged in user
  const socket = useSocketProvider();
  const [chats, addChat] = useMessageProvider();
  console.log(chats);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setRecipientId(recipientid);
  }, [recipientid]);

  useEffect(() => {
    if (user && socket) {
      socket?.current?.on("msg-receive", (data) => {
        setArrivalMessage({
          fromSelf: false,
          message: data.msg,
          from: data.from,
        });
      });

      return () => {
        socket.current.off("msg-receive");
      };
    }
  }, [user, socket]);

  useEffect(() => {
    if (arrivalMessage) {
      // setMessages((prev) => [...prev, arrivalMessage]);
      addChat(recipientid, arrivalMessage);
    }
  }, [arrivalMessage]);

  const handleSendMsg = async () => {
    if (socket && recipientId && msg) {
      const messageObject = {
        fromSelf: true,
        message: msg,
      };

      addChat(recipientid, messageObject);

      const response = await fetch("http://localhost:5000/api/messages/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: user._id,
          to: recipientId,
          message: msg,
        }),
      });

      const response2 = await fetch(
        "http://localhost:5000/api/chathistory/addchat",
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

      socket.current.emit("send-msg", {
        from: user._id,
        to: recipientId,
        msg,
      });
      setMsg("");
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
        <h3>You : {user?.username}</h3>
      </div>
      <div
        className="messages"
        style={{
          padding: "2vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chats.get(recipientid)?.map((message) => (
          <div
            key={uuidv4()}
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
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          value={msg}
          placeholder="Message"
          onChange={(e) => setMsg(e.target.value)}
          style={{ padding: "1vw", width: "60%" }}
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
