import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
import userRoutes from "../routes/usersRoutes.js";
// setup local env
dotenv.config();
//db connect
dbConnect();
const app = express();
app.use(express.json());

//express routes
app.use("/", userRoutes);

export default app;
