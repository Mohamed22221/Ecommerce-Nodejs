import express from "express";
import {
  loginUser,
  profileUser,
  regesterUser,
} from "../controllers/usersController.js";
import verifyToken from "../utils/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/regester", regesterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", verifyToken, profileUser);

export default userRoutes;
