import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import { useUserProvider } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user] = useUserProvider();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div>Home</div>
    </>
  );
}

export default Home;
