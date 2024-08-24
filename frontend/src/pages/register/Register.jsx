import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("current-user_name")) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    if (userName && password) {
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

      if (data.status === false) {
        console.log(data);
        console.log("Error while logging in");
        navigate("/register");
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      }
    } else {
      console.error("Name, Password, and Email can't be empty");
    }
  };

  return (
    <>
      <div className="registerDiv">
        <h1>Register</h1>
        <div className="regInputarea">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            name="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>
            Already have an account?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
              to={"/login"}
            >
              Login
            </Link>
          </span>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Register;
