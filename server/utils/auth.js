import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET; // Replace with your actual secret key
const expiration = "1d";

const AuthenticationError = new GraphQLError("Could not authenticate user.", {
  extensions: {
    code: "UNAUTHENTICATED",
  },
});

const authMiddleware = function ({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // We split the token string into an array and return the actual token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    throw AuthenticationError;
  }

  // if the token can be verified, add the decoded user's data to the request
  // so it can be accessed in the resolver
  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
    return { user: req.user };
  } catch (err) {
    console.error("Auth error: ", err.message);
  }

  // return the request object so it can be passed to the resolver as `context`
  return { user: req.user };
};

const signToken = function ({ email, username, _id }) {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { AuthenticationError, authMiddleware, signToken };
