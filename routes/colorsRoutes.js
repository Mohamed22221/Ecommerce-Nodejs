import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createColor,
  deleteColor,
  getAllColors,
  getColor,
  updateColor,
} from "../controllers/colorsController.js";

const colorsRoutes = express.Router();

colorsRoutes.route("/").get(getAllColors).post(verifyToken, createColor);

colorsRoutes
  .route("/:id")
  .get(getColor)
  .put(verifyToken, updateColor)
  .delete(verifyToken, deleteColor);

export default colorsRoutes;
