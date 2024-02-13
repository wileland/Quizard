import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";

const Home = () => {
  const [gameCode, setGameCode] = useState("");
  const socket = useRef(null);


  // function joinGame() {
  //   if (gameCode.trim()) {
  //     socket.current.emit("joinGame", gameCode);
  //   } else {
  //     console.log("INVALID GAME CODE !!");
  //   }
  // }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Lobby Code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
      />
      {/* <button type="button" onClick={joinGame}>
        Join!
      </button> */}
    </div>
  );
};

export default Home;
