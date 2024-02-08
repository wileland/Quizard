import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./mutations";
import { useNavigate } from "react-router-dom";

export const loginHandle = () => {
  const navigate();

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      //JWT token given here
      //
      //TODO: display console.log
      //
      //TODO: redirect user --> /dashboard

    },
    onError: (err) => {
      console.error('Error while attempting to log in', err);
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
    }
    catch (err) {
      console.error('Error during the submission process', err);
    }
  };

  return { handleSubmit, loading, error };
}
