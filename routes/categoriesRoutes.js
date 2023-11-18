import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { createCategory } from "../controllers/categoriesController.js";

const categoriesRoutes = express.Router();

categoriesRoutes.route("/").post(verifyToken, createCategory);


export default categoriesRoutes;
