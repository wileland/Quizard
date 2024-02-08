import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_PROFILE } from "./mutations";

export const signupHandling = () => {
  const navigate = useNavigate();
  const [addProfile, { loading, error }] = useMutation(ADD_PROFILE, {
    onCompleted: (data) => {
      //JWT Token here
      //
      console.log("Signup is successfull !!", data);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Error signing up :(", err);
    },
  });

  const handleSignup = async (email, username, password) => {
    try {
      await addProfile({
        variables: {
          email,
          username,
          password,
        },
      });
    } catch (err) {
      console.error("Error while attempting to signup !!", err);
    }
  };

  return { handleSignup, loading, error };
};
