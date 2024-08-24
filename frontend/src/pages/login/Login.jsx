import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("current-user_name")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (userName && password) {
      const response = await fetch("http://localhost:5000/api/user/login", 
        {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Your request body data
          username: userName,
          password,
         
        }),
      });
      const data = await response.json();

      if (data.status === false) {
        console.log(data);

        console.log("Error while logging in");

        navigate("/login");
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      }
    } else {
      console.error("Name and Password can't be empty");
    }
  };

  return (
    <>
      <div className="loginDiv">
        <h1>Login</h1>
        <div className="loginInputarea">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span style={{ fontWeight: "bold" }}>
            Already have an account?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "rgb(22, 72, 72)",
                fontWeight: "bold",
              }}
              to={"/login"}
            >
              Login
            </Link>
          </span>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
