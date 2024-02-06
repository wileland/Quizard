import { Link } from "react-router-dom";

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
