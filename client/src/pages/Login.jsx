import { useState } from "react";
import React from "react";
import { useMutation } from "@apollo/client";
import { loginHandle } from "../utils/loginHandling";

function Login() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const { handleSubmit, loading, error } = loginHandle();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(email, password);
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

export default Login;
