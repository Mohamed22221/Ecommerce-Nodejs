import asyncWrapper from "../middlewares/asyncWrapper.js";
import Product from "../model/Product.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";

//@desc Controll create product
//@route Post api/v1/regester
//@access Private/admin

export const createProduct = asyncWrapper(async (req, res, next) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;
  //check exist user
  const exist = await Product.findOne({ name });
  if (exist) {
    const error = sendError.create(400, ERROR, "Product already exist");
    return next(error);
  }
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    userID: req.currentUser._id,
    price,
    totalQty,
  });
  res.status(201).json({
    status: SUCCESS,
    message: "Product created successfully",
    data: product,
  });
});
