import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const Home = () => {
  const { curUser } = useContext(AppContext);
  
  return curUser ? (
    <div className="content">
      Hello, {curUser.username}
    </div>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default Home;
