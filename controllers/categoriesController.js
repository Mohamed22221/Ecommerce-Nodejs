import asyncWrapper from "../middlewares/asyncWrapper.js";
import Category from "../model/Category.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";


//@desc Controll create Category
//@route Post api/v1/categories
//@access Private/admin
export const createCategory = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  //check exist user
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    const error = sendError.create(400, ERROR, "Category already exist");
    return next(error);
  }
  const category = await Category.create({
    name,
    userID: req.currentUser._id,
  });
  res.status(201).json({
    status: SUCCESS,
    message: "Category created successfully",
    data: { category },
  });
});
