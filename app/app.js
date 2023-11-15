import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
import userRoutes from "../routes/usersRoutes.js";
import { ERROR } from "../utils/httpStatus.js";
// setup local env
dotenv.config();
//db connect
dbConnect();
const app = express();
app.use(express.json());

//express routes
app.use("/", userRoutes);

// global middleware for handel error
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
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
