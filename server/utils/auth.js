// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Add user finding logic here using decoded data (usually user ID)
//     // For example: req.user = await User.findById(decoded.id);
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// export { authMiddleware };



import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const secret = 'yourSecretKey';  // Replace with your actual secret key
const expiration = '1d';

const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

const authMiddleware = function ({ req }) {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // We split the token string into an array and return the actual token
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  // if the token can be verified, add the decoded user's data to the request
  // so it can be accessed in the resolver
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  // return the request object so it can be passed to the resolver as `context`
  return req;
};

const signToken = function ({ email, username, _id }) {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { AuthenticationError, authMiddleware, signToken };