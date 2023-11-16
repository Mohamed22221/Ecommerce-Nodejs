// Create token
import jwt from "jsonwebtoken";

const generateToken = async (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export default generateToken