import React from "react";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //TODO: Create and bring in the function for sign in.
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label></label>
        <input
          type="text"
          id="email"
          value={email.trim()}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label></label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Signup;
