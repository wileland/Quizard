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
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter Lobby Code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
      />
      {/* Add motion effects to the button if uncommented */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        type="button"
        onClick={joinGame}
      >
        Join!
      </motion.button> */}
    </motion.div>
  );
};

export default Home;
