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

  const handleRegister = () => {
    if (userName && password && email) {
      localStorage.setItem("current-user_name", JSON.stringify(userName));
      localStorage.setItem("current-user_id", JSON.stringify(password));
      navigate("/");
    } else {
      console.error("Name,Password and Email cannot be empty");
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
          <button onClick={handleRegister}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
