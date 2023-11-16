import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { createProduct } from "../controllers/productsController.js";

const productsRoutes = express.Router();


productsRoutes.post("/", verifyToken, createProduct);

export default productsRoutes;
