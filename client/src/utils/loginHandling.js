import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./mutations";
import { useNavigate } from "react-router-dom";

export const loginHandle = () => {
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      //JWT token given here
      //
      //TODO: display console.log
      console.log("Login was a success !!", data);
      //TODO: redirect user --> /dashboard
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Error while attempting to log in", err);
    },
  });

  const handleSubmit = async (email, password) => {
    try {
      await login({
        variables: {
          email,
          password,
        },
      });
    } catch (err) {
      console.error("Error during the submission process", err);
    }
  };

  return { handleSubmit, loading, error };
};
