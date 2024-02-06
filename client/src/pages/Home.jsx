const Home = () => {
  const loginClick = () => {
    console.log("Login Clicked");
  };

  return (
    <div>
      <button onClick={loginClick}>Login</button>
    </div>
  );
};

export default Home;
