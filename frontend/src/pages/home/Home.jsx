import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useUserProvider } from "../../context/UserContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { useSocketProvider } from "../../context/SocketContextProvider";

function Home() {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const { user } = useUserProvider();
  const socket = useSocketProvider();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleVisitors = async () => {
      const response = await fetch(
        `http://localhost:5000/api/user/allusers/${user?._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setVisitors(data.users);
      // console.log(data);
    };
    handleVisitors();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "2vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            alignItems: "center",
            width: "80vw",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {visitors?.map((visitor) => (
            <Link
              to={`/chat/${visitor.username}/${visitor._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={visitor._id} // using _id as key
            >
              <div style={{ width: "80vw", height: "5vh" }}>
                <h6
                  style={{
                    alignContent: "center",
                    padding: "0.5vh",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    fontSize: "3vh",
                    marginTop: "1vh",
                    height: "5vh",
                  }}
                >
                  {visitor.username}
                </h6>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
