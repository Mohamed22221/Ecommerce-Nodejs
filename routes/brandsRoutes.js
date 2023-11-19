import express from "express";
import verifyToken from "../utils/verifyToken.js";

import {
  createBrands,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "../controllers/BrandsController.js";

const brandsRoutes = express.Router();

brandsRoutes.route("/").get(getAllBrands).post(verifyToken, createBrands);

brandsRoutes
  .route("/:id")
  .get(getBrand)
  .put(verifyToken, updateBrand)
  .delete(verifyToken, deleteBrand);

export default brandsRoutes;
