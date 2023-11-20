import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import { ERROR } from "../utils/httpStatus.js";
//import express routes
import userRoutes from "../routes/usersRoutes.js";
import productsRoutes from "../routes/productsRoutes..js";
import categoriesRoutes from "../routes/CategoriesRoutes.js";
import brandsRoutes from "../routes/brandsRoutes.js";
import colorsRoutes from "../routes/colorsRoutes.js";
import reviewsRoutes from "../routes/reviewsRoutes.js";
// setup local env
dotenv.config();
//db connect
dbConnect();
const app = express();
app.use(express.json());

//express routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRoutes);
app.use("/api/v1/categories/", categoriesRoutes);
app.use("/api/v1/brands/", brandsRoutes);
app.use("/api/v1/colors/", colorsRoutes);
app.use("/api/v1/reviews/", reviewsRoutes);

// global middleware for handel error
app.use((error, req, res, next) => {
  res.status(error.statusCode || 400).json({
    status: error.status || ERROR,
    message: error.message,
    data: null,
  });
});
// global middleware for not found routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: ERROR,
    message: "Not Found Resource",
  });
});
export default app;
