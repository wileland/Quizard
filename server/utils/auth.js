import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user finding logic here using decoded data (usually user ID)
    // For example: req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export { authMiddleware };
