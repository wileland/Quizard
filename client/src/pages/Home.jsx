import React, { useState } from "react";

const Home = () => {
  const [gameCode, setGameCode] = useState("");
  const inputStyles = "w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:border-blue-500";
  const containerStyles = "flex items-center justify-center h-screen bg-orange-200";
  const cardStyles = "bg-teal-500 p-8 rounded-md shadow-lg";
  const inputContainerStyles = "mb-4";
  const buttonStyles = "mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600";

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div className={inputContainerStyles}>
          <input
            type="text"
            placeholder="Enter Lobby Code"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            className={inputStyles}
          />
        </div>
        {/* You can add more styling to the button if you uncomment it */}
        {/* <button type="button" className={buttonStyles} onClick={joinGame}>
          Join!
        </button> */}
      </div>
    </div>
  );
};

export default Home;
