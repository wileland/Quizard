import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Header = () => {
  const [click, setClick] = useState(false);

  const btnClick = () => {
    setClick(!click);
  };

  const content = (
    <>
      <div>
        <ul>
          <li>
            <Link spy="true" smooth="true" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link spy="true" smooth="true" to="/login">
              Login
            </Link>
          </li>

          <li>
            <Link spy="true" smooth="true" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <nav>
      <div>
        {/* logo of a wizard below*/}

        <span>Logo</span>
        <div>{click && content}</div>

        <button onClick={btnClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
