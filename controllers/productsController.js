import asyncWrapper from "../middlewares/asyncWrapper.js";
import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";

import sendError from "../utils/classError.js";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.js";
import handelPagination from "../utils/pagination.js";

//@desc Controll get products
//@route Get api/v1/products
//@access Public/users

export const getAllProducts = asyncWrapper(async (req, res) => {
  //handel pagination
  const query = req.query;
  const total = await Product.countDocuments();
  const { limit, startIndex, results } = handelPagination(query, total);

  let productQuiry = Product.find({}, { __v: false })
    .limit(limit)
    .skip(startIndex);

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
  //filter by price
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
    total,
    results: products.length,
    pagination: results,
    data:  products ,
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
    price,
    totalQty,
  } = req.body;
  //check exist user
  const existProduct = await Product.findOne({ name });
  if (existProduct) {
    const error = sendError.create(400, ERROR, "Product already exist");
    return next(error);
  }
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    const error = sendError.create(
      400,
      ERROR,
      "Category not found , please create category first or check category name  "
    );
    return next(error);
  }

  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) {
    const error = sendError.create(
      400,
      ERROR,
      "Brand not found , please create brand first or check brand name  "
    );
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
  // push product in the same category
  categoryFound.products.push({ name, brand, category });
  await categoryFound.save();

  // push product in the same brand
  brandFound.products.push({ name, brand, category });
  await brandFound.save();

  res.status(201).json({
    status: SUCCESS,
    message: "Product created successfully",
    data:  product ,
  });
});

//@desc Controll get product
//@route Get api/v1/products/:id
//@access Public/users

export const getProduct = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const product = await Product.findById(dynamicId);

  if (!product) {
    const error = sendError.create(404, FAIL, "Product not found ");
    return next(error);
  }
  res.json({
    status: SUCCESS,
    message: "Product found successfully",
    data:  product ,
  });
});

//@desc Controll update product
//@route Put api/v1/products/:id
//@access Private/users

export const updateProduct = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const product = await Product.findByIdAndUpdate(
    dynamicId,
    { ...req.body },
    { new: true }
  );
  if (!product) {
    const error = sendError.create(404, FAIL, "Product not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Product updated successfully",
    data:  product ,
  });
});

//@desc Controll delete product
//@route Put api/v1/products/:id
//@access Private/users

export const deleteProduct = asyncWrapper(async (req, res, next) => {
  const dynamicId = req.params.id;
  const product = await Product.findByIdAndDelete(dynamicId);
  if (!product) {
    const error = sendError.create(404, FAIL, "Product not found ");
    return next(error);
  }

  res.json({
    status: SUCCESS,
    message: "Product deleted successfully",
  });
});
