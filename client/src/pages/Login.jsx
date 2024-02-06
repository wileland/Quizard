import { useState } from "react";
import React from "react";

function Login() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Logging in ${username}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label></label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label></label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
