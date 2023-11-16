import jwt from "jsonwebtoken";
import sendError from "./classError.js";
import { ERROR } from "./httpStatus.js";

const verifyToken = async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    const error = sendError.create(401, ERROR, "Token is required");
    return next(error);
  }
  console.log(auth)
  const token = auth?.split(" ")[1];

  try {
    jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    const error = sendError.create(401, ERROR, "Invalid token");
    return next(error);
  }
};

export default verifyToken;
