import express from "express";
import { regesterUser } from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes.post("/api/vi/users/regester", regesterUser);

export default userRoutes;
