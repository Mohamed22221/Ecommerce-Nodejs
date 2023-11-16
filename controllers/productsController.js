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
  let productQuiry = Product.find().limit(limit).skip(skip);
  //filter by name
  if (query.name) {
    productQuiry = productQuiry.find({
      name: { $regex: query.name, $options: "i" },
    });
  }
  //filter by brand
  if (query.brand) {
    productQuiry = productQuiry.find({
      brand: { $regex: query.brand, $options: "i" },
    });
  }
  //filter by category
  if (query.category) {
    productQuiry = productQuiry.find({
      category: { $regex: query.category, $options: "i" },
    });
  }
  //filter by sizes
  if (query.size) {
    productQuiry = productQuiry.find({
      sizes: { $regex: query.size, $options: "i" },
    });
  }
  //filter by color
  if (query.color) {
    productQuiry = productQuiry.find({
      colors: { $regex: query.color, $options: "i" },
    });
  }
  //filter by color
  if (query.price) {
    const rangePrice = query.price.split("-");
    productQuiry = productQuiry.find({
      price: { $gte: rangePrice[0], $lte: rangePrice[1] },
    });
  }
  //return products
  const products = await productQuiry;

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
