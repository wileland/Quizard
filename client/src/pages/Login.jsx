import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { motion } from 'framer-motion';
import Auth from "../utils/auth.js";
const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      navigate("/dashboard");
    } catch (e) {
      console.error("Login error", e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen bg-neon-purple text-white"
    >
      <div className="card bg-gray-900 text-white p-6 rounded-md shadow-md">
        <h4 className="text-lg font-semibold mb-4">Login</h4>
        {data ? (
          <p>
            Success! You may now head{" "}
            <Link to="/dashboard" className="text-neon-blue hover:underline">
              back to the homepage.
            </Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input
              className="input-field"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="input-field"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="btn btn-info w-full"
              type="submit"
            >
              Submit
            </motion.button>
          </form>
        )}
        {error && (
          <p className="mt-4 text-red-500">{error.message}</p>
        )}
      </div>
    </motion.main>
  );
};
export default Login;