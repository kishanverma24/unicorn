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
    if (userName && password && email) {
      const data = await axios.post("", {
        userName,
        email,
        password,
      });
      if (data.status === false) {
        alert("Email or username already exist");
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
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
          <button onClick={handleRegister}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Register;
