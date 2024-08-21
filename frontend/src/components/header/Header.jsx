import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "7vh",
        backgroundColor: "lightblue",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <h1 style={{ cursor: "pointer" }}>Chatty</h1>
      <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
        <h5>Home</h5>
      </Link>
      <Link
        to={"/chathistory"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h5>Chats</h5>
      </Link>
      <h5 onClick={handleLogout} style={{ cursor: "pointer" }}>
        Logout
      </h5>
    </div>
  );
};

export default Header;
