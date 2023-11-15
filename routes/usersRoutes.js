import express from "express";
import {
  loginUser,
  profileUser,
  regesterUser,
} from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes.post("/regester", regesterUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", profileUser);

export default userRoutes;
