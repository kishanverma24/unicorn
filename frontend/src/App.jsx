import React from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Chat from "./pages/chat/Chat.jsx";
import ChatHistory from "./pages/chatHistory/ChatHistory";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat:username" element={<Chat />} />
        <Route path="/chathistory" element={<ChatHistory />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
