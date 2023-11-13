import express from "express";
import { loginUser, regesterUser } from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes.post("/api/vi/users/regester", regesterUser);
userRoutes.post("/api/vi/users/login", loginUser);

export default userRoutes;
