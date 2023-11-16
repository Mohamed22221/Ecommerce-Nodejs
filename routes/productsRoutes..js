import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productsController.js";

const productsRoutes = express.Router();

productsRoutes.route("/").get(getAllProducts).post(verifyToken, createProduct);

export default productsRoutes;
