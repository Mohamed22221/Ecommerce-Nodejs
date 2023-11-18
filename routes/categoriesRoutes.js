import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoriesController.js";

const categoriesRoutes = express.Router();

categoriesRoutes
  .route("/")
  .get(getAllCategories)
  .post(verifyToken, createCategory);

export default categoriesRoutes;
