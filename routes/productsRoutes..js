import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController.js";

const productsRoutes = express.Router();

productsRoutes.route("/").get(getAllProducts).post(verifyToken, createProduct);
productsRoutes
  .route("/:id")
  .get(getProduct)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);

export default productsRoutes;
