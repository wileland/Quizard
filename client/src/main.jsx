// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Signup from "./pages/signup.jsx";
import QuizForm from "./pages/QuizForm.jsx";
import QuestionForm from "./components/QuestionForm.jsx";
import { motion, AnimatePresence } from 'framer-motion';

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/quizform",
        element: <QuizForm />,
      },
      {
        path: "/questionform",
        element: <QuestionForm />,
      },
    ],
  },
]);

const AppWithMotion = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <RouterProvider router={router} />
      </motion.div>
    </AnimatePresence>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <AppWithMotion />
  </ApolloProvider>,
);
