import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Home = () => {
  const [gameCode, setGameCode] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:3001");
    const handleInit = (msg) => {
      console.log(msg);
    };

    socket.on("init", handleInit);
  }, []);

  function joinGame() {
    socket.emit("joinGame", gameCode);
    init();
  }

  return (
    <div>
      <div>
        <input
          id="gameInputCode"
          type="text"
          placeholder="Enter Lobby Code"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
        />

        <button id="joinLobbyBtn" type="button" onClick={joinGame}>
          Join!
        </button>
      </div>
    </div>
  );
};

export default Home;
