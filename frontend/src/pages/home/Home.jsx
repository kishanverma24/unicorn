import React from "react";
import Header from "../../components/header/Header";

function Home() {
  console.log(JSON.parse(localStorage.getItem("chat-app_user")));

  return (
    <>
      <Header />
      <div>Home</div>
    </>
  );
}

export default Home;
