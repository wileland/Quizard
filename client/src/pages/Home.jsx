import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Home = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001");
    const handleInit = (msg) => {
      console.log(msg);
    };

    socket.on("init", handleInit);
  }, []);

  const gameInputCode = document.getElementById("gameInputCode");
  const joinBtn = document.getElementById("joinLobbyBtn");
  //TODO: create a function called joinGame
  joinBtn.addEventListener("click", joinGame);

  return (
    <div>
      <div>
        <input id="gameInputCode" type="text" placeholder="Enter Lobby Code" />
        <button id="joinLobbyBtn" type="submit">
          Join!
        </button>
      </div>
    </div>
  );
};

export default Home;
