import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserProvider } from "../../context/UserContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserProvider();

  const handleLogout = async () => {
    const response = await fetch(
      `http://localhost:5000/api/user/logout/${user._id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success === true) {
      setUser(null);
      localStorage.clear();
    }
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
