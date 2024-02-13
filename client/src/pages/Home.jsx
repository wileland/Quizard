import React, { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';

const Home = () => {
  const [gameCode, setGameCode] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen bg-neon-purple text-white"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter Lobby Code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
        className="bg-transparent border-b-2 border-white p-2 mb-4 text-center text-white focus:outline-none"
      />
      {/* Add motion effects to the button if uncommented */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        type="button"
        onClick={joinGame}
        className="bg-neon-blue text-white px-4 py-2 rounded-md shadow-md hover:bg-neon-pink hover:shadow-lg transition duration-300"
      >
        Join!
      </motion.button> */}
    </motion.div>
  );
};

export default Home;
