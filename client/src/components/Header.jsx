import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { motion } from 'framer-motion';

const menuVariants = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  }
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-neon-purple">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo of a wizard goes here */}
        <span className="text-white text-2xl font-wizard">Logo</span>

        <motion.div
          className="menu-container"
          variants={menuVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          <ul className="flex">
            <li className="ml-4">
              <Link to="/" className="text-white hover:text-neon-blue">Home</Link>
            </li>
            <li className="ml-4">
              <Link to="/login" className="text-white hover:text-neon-blue">Login</Link>
            </li>
            <li className="ml-4">
              <Link to="/signup" className="text-white hover:text-neon-blue">Signup</Link>
            </li>
          </ul>
        </motion.div>

        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-white" /> : <CiMenuFries className="text-white" />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
