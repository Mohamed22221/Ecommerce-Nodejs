import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { createReviews } from "../controllers/reviewsController.js";

const reviewsRoutes = express.Router();

reviewsRoutes.route("/:productID").post(verifyToken, createReviews);

export default reviewsRoutes;
