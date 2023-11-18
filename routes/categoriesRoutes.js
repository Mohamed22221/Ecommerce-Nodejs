import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoriesController.js";

const categoriesRoutes = express.Router();

categoriesRoutes
  .route("/")
  .get(getAllCategories)
  .post(verifyToken, createCategory);

  categoriesRoutes
  .route("/:id")
  .get(getCategory)
  .put(verifyToken, updateCategory)
  .delete(verifyToken, deleteCategory);

export default categoriesRoutes;
