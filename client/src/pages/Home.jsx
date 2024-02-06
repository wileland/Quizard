import { Link } from "react-router-dom";
import React from "react";
const Home = () => {
  return (
    <div>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
