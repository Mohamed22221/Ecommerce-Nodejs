import asyncWrapper from "../middlewares/asyncWrapper.js";
import Product from "../model/Product.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";

//@desc Controll get products
//@route get api/v1/products
//@access public/users

export const getAllProducts = asyncWrapper(async (req, res) => {
  //handel pagination
  const query = req.query;
  const limit = 6;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  //handel courses and pagination
  const products = await Product
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.json({
    status: SUCCESS,
    message: "Get products successfully",
    data: { products },
  });
});

//@desc Controll create product
//@route Post api/v1/products
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
    data: { product },
  });
});
